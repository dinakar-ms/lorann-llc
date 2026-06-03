// Replaces DataAssetsCascade section in Navbar.tsx with the hover cascade design
import { readFileSync, writeFileSync } from "fs";

const file = "components/Navbar.tsx";
const content = readFileSync(file, "utf8");
const lines = content.split("\n");

// Lines 163-449 (0-indexed: 162-448) contain the old tab/cascade section
const before = lines.slice(0, 162).join("\n");
const after = lines.slice(449).join("\n");

const newBlock = `/* ── Shared column header ── */
function ColHeader({ label }: { label: string }) {
  return (
    <h4 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3 flex items-center gap-2 px-1">
      {label}
      <span className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
    </h4>
  );
}

/* ── Single column of nav rows ── */
function NavColumn({
  title, items, activeHref, anchorHref, onHover, onLinkClick, isPrimary,
}: {
  title: string;
  items: DataAssetNode[];
  activeHref: string | null;
  anchorHref: string | null;
  onHover: (node: DataAssetNode) => void;
  onLinkClick: () => void;
  isPrimary?: boolean;
}) {
  return (
    <div className={\`flex flex-col flex-shrink-0 \${isPrimary ? "w-[220px] xl:w-[240px]" : "w-[200px] xl:w-[218px]"}\`}>
      <ColHeader label={title} />
      <ul className="flex flex-col gap-0.5">
        {items.map((node) => {
          const Icon = node.Icon;
          const hasChildren = !!node.children?.length;
          const isActive = activeHref === node.href || anchorHref === node.href;
          return (
            <li key={node.href} onMouseEnter={() => onHover(node)}>
              <Link
                href={node.href}
                onClick={onLinkClick}
                className={\`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-colors group/row
                  \${isActive ? "bg-blue-50 text-blue-700" : "text-slate-800 hover:bg-blue-50 hover:text-blue-700"}\`}
              >
                {isPrimary && Icon && (
                  <span
                    className={\`w-9 h-9 rounded-[10px] grid place-items-center transition-all flex-shrink-0
                      \${isActive
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                        : "bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover/row:from-blue-600 group-hover/row:to-cyan-500 group-hover/row:text-white group-hover/row:border-transparent"
                      }\`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold text-[13.5px] leading-tight">
                    <span className="truncate">{node.label}</span>
                    {node.badge && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex-shrink-0">
                        {node.badge}
                      </span>
                    )}
                  </span>
                  {isPrimary && node.desc && (
                    <span className="block text-[11.5px] text-slate-500 mt-0.5 leading-snug truncate">
                      {node.desc}
                    </span>
                  )}
                </span>
                {hasChildren ? (
                  <ChevronRight
                    className={\`w-3.5 h-3.5 flex-shrink-0 \${isActive ? "text-blue-600" : "text-slate-300 group-hover/row:text-blue-500"}\`}
                  />
                ) : (
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/row:text-blue-500 flex-shrink-0" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DataAssetsCascade({
  isOpen,
  onLinkClick,
}: {
  isOpen: boolean;
  onLinkClick: () => void;
}) {
  // Defaults: B2B Database → Healthcare → first HC group
  const defaultL1 = DATA_ASSETS_TREE[0];
  const defaultL2 = defaultL1.children?.[0] ?? null;
  const defaultL3 = defaultL2?.children?.[0] ?? null;

  // Anchor drives content of next column; hover drives visual highlight only
  const [l1Anchor, setL1Anchor] = useState<DataAssetNode>(defaultL1);
  const [l2Anchor, setL2Anchor] = useState<DataAssetNode | null>(defaultL2);
  const [l3Anchor, setL3Anchor] = useState<DataAssetNode | null>(defaultL3);
  const [l1Hover, setL1Hover] = useState<string | null>(defaultL1.href);
  const [l2Hover, setL2Hover] = useState<string | null>(defaultL2?.href ?? null);
  const [l3Hover, setL3Hover] = useState<string | null>(defaultL3?.href ?? null);

  useEffect(() => {
    if (!isOpen) {
      setL1Anchor(defaultL1); setL2Anchor(defaultL2); setL3Anchor(defaultL3);
      setL1Hover(defaultL1.href); setL2Hover(defaultL2?.href ?? null); setL3Hover(defaultL3?.href ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleL1 = (node: DataAssetNode) => {
    setL1Hover(node.href);
    if (!node.children?.length) return;
    setL1Anchor(node);
    const first = node.children[0];
    setL2Anchor(first); setL2Hover(first.href);
    const firstGrand = first.children?.[0] ?? null;
    setL3Anchor(firstGrand); setL3Hover(firstGrand?.href ?? null);
  };

  const handleL2 = (node: DataAssetNode) => {
    setL2Hover(node.href);
    if (!node.children?.length) return;
    setL2Anchor(node);
    const first = node.children[0];
    setL3Anchor(first.children?.length ? first : null);
    setL3Hover(first.children?.length ? first.href : null);
  };

  const handleL3 = (node: DataAssetNode) => {
    setL3Hover(node.href);
    if (node.children?.length) setL3Anchor(node);
  };

  const col2Items = l1Anchor.children ?? [];
  const col3Items = l2Anchor?.children ?? [];
  const col4Items = l3Anchor?.children ?? [];

  return (
    <div
      className="bg-white border border-slate-200 rounded-[22px] shadow-2xl p-5 xl:p-6 flex overflow-x-auto"
      style={{ maxWidth: "min(calc(100vw - 32px), 1140px)", scrollbarWidth: "none" }}
    >
      {/* Column 1 — Data Assets (always visible) */}
      <NavColumn
        title="Data Assets"
        items={DATA_ASSETS_TREE}
        activeHref={l1Hover}
        anchorHref={l1Anchor.href}
        onHover={handleL1}
        onLinkClick={onLinkClick}
        isPrimary
      />

      {/* Column 2 — Sub-categories of selected L1 */}
      {col2Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 mx-4 self-stretch flex-shrink-0" />
          <NavColumn
            title={l1Anchor.label}
            items={col2Items}
            activeHref={l2Hover}
            anchorHref={l2Anchor?.href ?? null}
            onHover={handleL2}
            onLinkClick={onLinkClick}
          />
        </>
      )}

      {/* Column 3 — Children of selected L2 */}
      {col3Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 mx-4 self-stretch flex-shrink-0" />
          <NavColumn
            title={l2Anchor?.label ?? ""}
            items={col3Items}
            activeHref={l3Hover}
            anchorHref={l3Anchor?.href ?? null}
            onHover={handleL3}
            onLinkClick={onLinkClick}
          />
        </>
      )}

      {/* Column 4 — Leaves of selected L3 (HC specialty leaves / ERP items etc.) */}
      {col4Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 mx-4 self-stretch flex-shrink-0" />
          <div className="flex flex-col flex-shrink-0 w-[200px] xl:w-[218px]">
            <ColHeader label={l3Anchor?.label ?? ""} />
            <ul className="flex flex-col gap-0.5">
              {col4Items.map((leaf) => (
                <li key={leaf.href}>
                  <Link
                    href={leaf.href}
                    onClick={onLinkClick}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-[13.5px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors group/lf"
                  >
                    <span className="truncate flex-1">{leaf.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/lf:text-blue-500 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}`;

const newContent = before + "\n" + newBlock + "\n" + after;
writeFileSync(file, newContent, "utf8");
console.log("Done. Lines:", newContent.split("\n").length);
console.log("Verification - line 163:", newContent.split("\n")[162]);
