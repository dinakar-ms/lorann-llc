import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { writeClient } from "@/sanity/lib/writeClient";
import ManageCardRow from "./ManageCardRow";

export const dynamic = "force-dynamic";

export type ManageCard = {
  _id: string;
  name?: string;
  category?: string;
  universe?: number;
  lastUpdated?: string;
  hasSubmission: boolean;
};

const query = `*[_type == "dataCard"] | order(coalesce(lastUpdated, "1970-01-01") desc) {
  _id, name, category, universe, lastUpdated,
  "submissionCount": count(*[_type == "dataCardSubmission" && publishedDataCard._ref == ^._id])
}`;

type Raw = ManageCard & { submissionCount: number };

export default async function ManageDataCardsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login?callbackUrl=/dashboard/manage");

  let cards: ManageCard[] = [];
  try {
    const raw = await writeClient.fetch<Raw[]>(query);
    cards = raw.map((r) => ({
      _id: r._id,
      name: r.name,
      category: r.category,
      universe: r.universe,
      lastUpdated: r.lastUpdated,
      hasSubmission: r.submissionCount > 0,
    }));
  } catch (err) {
    console.error("Manage cards query failed:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">
          Manage Published Data Cards
        </h1>
        <p className="text-slate-600">
          Every data card currently live on the public site. Use this to clean up cards
          that no longer have a submission behind them.
        </p>
      </div>

      {cards.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-600">
          No data cards published yet.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-[12px] font-mono uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Universe</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cards.map((c) => (
                <ManageCardRow key={c._id} card={c} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
