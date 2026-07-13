import type { ReactElement } from "react";

/**
 * Renders a Schema.org JSON-LD block for crawlers. The serialized JSON is
 * passed as a text child (not dangerouslySetInnerHTML), so React escapes it and
 * there is no script-breakout/XSS surface. Usable inside client pages — the
 * <script> ends up in the SSR HTML. Data must be developer-authored/static.
 */
export default function JsonLd({ data }: { data: object }): ReactElement {
  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}
