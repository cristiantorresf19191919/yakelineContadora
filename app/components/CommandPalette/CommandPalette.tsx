"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import TranslateIcon from "@mui/icons-material/Translate";
import PaletteIcon from "@mui/icons-material/Palette";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import { services } from "@/data/services";
import { blogArticles } from "@/lib/blogData";
import { THEME_ORDER, THEMES } from "@/lib/theme/themes";
import { applyTheme, useThemeId } from "@/lib/theme/theme-store";
import { useLanguage, type Language } from "@/app/contexts/LanguageContext";
import styles from "./CommandPalette.module.css";

const OPEN_EVENT = "yc:command-palette-open";
const WHATSAPP = "https://wa.me/573207269417";
const PHONE = "tel:+573207269417";

type GroupKey = "page" | "service" | "blog" | "action" | "theme";

interface CmdItem {
  id: string;
  group: GroupKey;
  title: string;
  subtitle?: string;
  meta?: string;
  haystack: string;
  icon: ReactNode;
  iconColor?: string;
  perform: () => void;
}

const GROUP_LABEL: Record<GroupKey, { es: string; en: string }> = {
  page: { es: "Páginas", en: "Pages" },
  service: { es: "Servicios", en: "Services" },
  blog: { es: "Blog", en: "Blog" },
  action: { es: "Acciones rápidas", en: "Quick actions" },
  theme: { es: "Temas", en: "Themes" },
};

const GROUP_ORDER: GroupKey[] = ["page", "action", "service", "blog", "theme"];

/** Strip diacritics + lowercase for accent-insensitive Spanish search. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Lightweight fuzzy score: prefix > substring > subsequence > miss. */
function score(haystack: string, query: string): number {
  if (!query) return 1;
  const idx = haystack.indexOf(query);
  if (idx === 0) return 1000;
  if (idx > 0) return 600 - Math.min(idx, 200);
  let hi = 0;
  let qi = 0;
  let gaps = 0;
  while (hi < haystack.length && qi < query.length) {
    if (haystack[hi] === query[qi]) qi++;
    else gaps++;
    hi++;
  }
  return qi === query.length ? Math.max(40, 300 - gaps) : 0;
}

export function CommandPalette() {
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  const themeId = useThemeId();
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Global ⌘K / Ctrl+K + custom open event.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Lock scroll + focus input while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(id);
    };
  }, [open]);

  const run = useCallback(
    (perform: () => void) => {
      close();
      // Defer so the overlay unmounts before navigation/side effects.
      window.setTimeout(perform, 0);
    },
    [close],
  );

  const items = useMemo<CmdItem[]>(() => {
    const pages: Array<[string, string, string, ReactNode, string]> = [
      ["/", t("Inicio", "Home"), t("Página principal", "Homepage"), <HomeIcon key="h" />, "inicio home principal"],
      ["/about", t("Quién soy", "About"), t("Conoce a Yakeline", "Meet Yakeline"), <PersonIcon key="p" />, "about quien soy sobre mi"],
      ["/services", t("Servicios", "Services"), t("Servicios contables", "Accounting services"), <BusinessIcon key="b" />, "servicios services contable"],
      ["/mentorship", t("Mentorías", "Mentorship"), t("Asesoría personalizada", "Personalized guidance"), <SchoolIcon key="s" />, "mentoria mentorship asesoria"],
      ["/citas", t("Agendar cita", "Book now"), t("Reserva tu consulta", "Book your consult"), <CalendarMonthIcon key="c" />, "cita agendar book appointment"],
      ["/checklist-renta", t("Checklist Renta 2025", "2025 Tax Checklist"), t("Documentos para tu declaración (PDF gratis)", "Documents for your tax return (free PDF)"), <ChecklistIcon key="cl" />, "checklist renta 2025 documentos declaracion pdf descargar download"],
      ["/book", t("Libro", "Book"), t("Publicaciones", "Publications"), <MenuBookIcon key="m" />, "libro book publicaciones"],
      ["/blog", t("Blog", "Blog"), t("Artículos y noticias", "Articles & news"), <ArticleIcon key="a" />, "blog articulos noticias"],
      ["/videos", t("Video Blog", "Videos"), t("Videos y contenido", "Videos & content"), <VideoLibraryIcon key="v" />, "videos video blog"],
      ["/politica-de-privacidad", t("Privacidad", "Privacy"), t("Política de privacidad", "Privacy policy"), <DescriptionIcon key="pr" />, "privacidad privacy politica"],
      ["/terminos-y-condiciones", t("Términos", "Terms"), t("Términos y condiciones", "Terms & conditions"), <DescriptionIcon key="tc" />, "terminos terms condiciones"],
    ];

    const pageItems: CmdItem[] = pages.map(([href, title, subtitle, icon, kw]) => ({
      id: `page:${href}`,
      group: "page",
      title,
      subtitle,
      icon,
      haystack: normalize(`${title} ${subtitle} ${kw}`),
      perform: () => router.push(href),
    }));

    const serviceItems: CmdItem[] = services.map((svc) => ({
      id: `service:${svc.id}`,
      group: "service",
      title: svc.name,
      subtitle: svc.summary,
      icon: <ReceiptLongIcon />,
      haystack: normalize(`${svc.name} ${svc.summary} ${svc.keywords.join(" ")}`),
      perform: () => router.push("/services"),
    }));

    const blogItems: CmdItem[] = blogArticles.map((art) => ({
      id: `blog:${art.slug}`,
      group: "blog",
      title: art.title,
      subtitle: art.excerpt,
      meta: art.category,
      icon: <ArticleIcon />,
      haystack: normalize(`${art.title} ${art.excerpt} ${art.category}`),
      perform: () => router.push(`/blog/${art.slug}`),
    }));

    const actionItems: CmdItem[] = [
      {
        id: "action:whatsapp",
        group: "action",
        title: t("Hablar por WhatsApp", "Chat on WhatsApp"),
        subtitle: t("Respuesta rápida y personal", "Fast, personal reply"),
        icon: <WhatsAppIcon />,
        haystack: normalize("whatsapp chat mensaje contacto contact"),
        perform: () => window.open(WHATSAPP, "_blank", "noopener,noreferrer"),
      },
      {
        id: "action:call",
        group: "action",
        title: t("Llamar ahora", "Call now"),
        subtitle: "+57 320 726 9417",
        icon: <PhoneIcon />,
        haystack: normalize("llamar call telefono phone celular"),
        perform: () => {
          window.location.href = PHONE;
        },
      },
      {
        id: "action:lang",
        group: "action",
        title: lang === "es" ? "Switch to English" : "Cambiar a Español",
        subtitle: t("Cambiar idioma del sitio", "Change site language"),
        icon: <TranslateIcon />,
        haystack: normalize("idioma language english espanol translate"),
        perform: () => setLang((lang === "es" ? "en" : "es") as Language),
      },
    ];

    const themeItems: CmdItem[] = THEME_ORDER.map((id) => {
      const def = THEMES[id];
      const isActive = id === themeId;
      return {
        id: `theme:${id}`,
        group: "theme",
        title: t(`Tema ${def.name}`, `${def.name} theme`),
        subtitle: def.tagline + (isActive ? t(" · activo", " · active") : ""),
        meta: def.mode === "dark" ? t("Oscuro", "Dark") : t("Claro", "Light"),
        icon: <PaletteIcon />,
        iconColor: def.accent,
        haystack: normalize(`tema theme ${def.name} ${def.tagline} ${def.mode}`),
        perform: () => applyTheme(id),
      };
    });

    return [...pageItems, ...actionItems, ...serviceItems, ...blogItems, ...themeItems];
  }, [router, t, lang, setLang, themeId]);

  // Filter + group.
  const groups = useMemo(() => {
    const q = normalize(query.trim());
    const scored = items
      .map((item) => ({ item, s: score(item.haystack, q) }))
      .filter((entry) => entry.s > 0);

    if (q) scored.sort((a, b) => b.s - a.s);

    const byGroup = new Map<GroupKey, CmdItem[]>();
    for (const { item } of scored) {
      const list = byGroup.get(item.group) ?? [];
      // When idle (no query), keep each group compact.
      const cap = q ? (item.group === "blog" ? 6 : 8) : item.group === "page" ? 6 : 3;
      if (list.length < cap) list.push(item);
      byGroup.set(item.group, list);
    }

    return GROUP_ORDER.map((key) => ({ key, items: byGroup.get(key) ?? [] })).filter(
      (g) => g.items.length > 0,
    );
  }, [items, query]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // Keep active index in range when results change.
  useEffect(() => {
    setActive((a) => (a >= flat.length ? 0 : a));
  }, [flat.length]);

  // Scroll active item into view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (flat.length ? (a + 1) % flat.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (flat.length ? (a - 1 + flat.length) % flat.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (item) run(item.perform);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  if (!mounted) return null;

  let runningIndex = -1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <div className={styles.backdrop} aria-hidden onClick={close} />

          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={t("Buscar", "Search")}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 360, damping: 30 }}
          >
            <div className={styles.searchRow}>
              <span className={styles.searchIcon} aria-hidden>
                <SearchIcon />
              </span>
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder={t(
                  "Busca páginas, servicios, artículos, temas…",
                  "Search pages, services, articles, themes…",
                )}
                aria-label={t("Buscar", "Search")}
                autoComplete="off"
                spellCheck={false}
              />
              <span className={styles.escHint}>ESC</span>
            </div>

            <div className={styles.results} ref={listRef}>
              {flat.length === 0 ? (
                <p className={styles.empty}>
                  {t("Sin resultados para", "No results for")} “{query}”
                </p>
              ) : (
                groups.map((group) => (
                  <div className={styles.group} key={group.key}>
                    <div className={styles.groupLabel}>
                      {lang === "es" ? GROUP_LABEL[group.key].es : GROUP_LABEL[group.key].en}
                    </div>
                    {group.items.map((item) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === active;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          data-idx={idx}
                          className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => run(item.perform)}
                        >
                          <span
                            className={styles.itemIcon}
                            style={item.iconColor ? { color: item.iconColor } : undefined}
                            aria-hidden
                          >
                            {item.icon}
                          </span>
                          <span className={styles.itemText}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            {item.subtitle && (
                              <span className={styles.itemSubtitle}>{item.subtitle}</span>
                            )}
                          </span>
                          {item.meta && <span className={styles.itemMeta}>{item.meta}</span>}
                          <span className={styles.enterHint} aria-hidden>
                            <SubdirectoryArrowLeftIcon />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <span className={styles.footerHint}>
                <span className={styles.kbd}>↑</span>
                <span className={styles.kbd}>↓</span>
                {t("navegar", "navigate")}
              </span>
              <span className={styles.footerHint}>
                <span className={styles.kbd}>↵</span>
                {t("seleccionar", "select")}
              </span>
              <span className={styles.footerHint}>
                <span className={styles.kbd}>esc</span>
                {t("cerrar", "close")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** Desktop header affordance that opens the palette. */
export function CommandPaletteTrigger() {
  const { t } = useLanguage();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      aria-label={t("Buscar en el sitio", "Search the site")}
    >
      <SearchIcon />
      {t("Buscar", "Search")}
      <span className={styles.triggerKbd}>
        {isMac ? <KeyboardCommandKeyIcon sx={{ fontSize: "0.7rem" }} /> : "Ctrl"}K
      </span>
    </button>
  );
}

export default CommandPalette;
