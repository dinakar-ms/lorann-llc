import { createClient } from "next-sanity";

const client = createClient({
  projectId: "a694bsry",
  dataset: "development",
  apiVersion: "2024-10-01",
  useCdn: false,
  perspective: "published",
  token: "skOARQGmEbXhq7uihEl15V2sBJUmpYAUXi9WKe5bqNfwpRcZkOjlNm6mE0qlWZMyFCcxViKMMIrfuazlBeTRBTa3x5c3TbbK6SbtaMk7DOXEgOPgS7OUCYVif4RRoauQl4yovesYOw7po7JXZwwP9iWdK6vDckqbZEMrpDP6x5jJx1VGHb1W",
});

const query = `*[_type == "page" && (slug.current == "data-assets/b2b-database/technology/dbms-users-email-data/mongodb-users-list" || slug.current == "data-assets/b2b-database/technology/erp-users-email-lists/i4a-erp-users-lists" || slug.current == "data-assets/b2b-database/technology/erp-users-email-lists/upside-software-erp-users-lists")] {
  _id,
  h1,
  kicker,
  titlePlain,
  titleAccent,
  heroDescription,
  metaDescription,
  attributes[] {
    title,
    desc
  },
  useCases[] {
    title,
    desc
  },
  useCasesSectionKicker,
  useCasesSectionTitle,
  useCasesSectionAccent,
  attributesSectionKicker,
  attributesSectionTitle,
  attributesSectionAccent
}`;

client.fetch(query).then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
