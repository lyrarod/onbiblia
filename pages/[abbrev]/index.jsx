import { useRouter } from "next/router";

import useSWR from "swr";

import Link from "next/link";
import Layout from "../../components/Layout";

import style from "../../styles/abbrev.module.css";

import Loader from "../../components/Loader";

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
    },
  }).then((res) => res.json());

export default function Abbrev() {
  const router = useRouter();
  const { abbrev } = router.query || [];

  const { data, error } = useSWR(
    abbrev ? [`https://www.abibliadigital.com.br/api/books/${abbrev}`] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>Loading. . .</div>;

  const arrChapters = new Array(data?.chapters).fill().map((_, i) => i + 1);

  return !data ? (
    <Layout title={"onBíblia"}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "50vh",
        }}
      >
        <Loader />
      </div>
    </Layout>
  ) : (
    <Layout title={`onBíblia - ${data.name}`}>
      <div
        style={{
          position: "sticky",
          top: "64px",
          left: "0",
          width: "100%",
          background: "linear-gradient(#0984e3, #74b9ff)",
          color: "whitesmoke",
          padding: "0.25rem 1rem",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "left" }}>
          {data.name === "Lamentações de Jeremias" ? "Lamentações" : data.name}
        </h2>
      </div>

      <div className={style.container_chapters}>
        {arrChapters.map((chapter) => {
          return (
            <Link key={chapter} href={`/${data.abbrev.pt}/${chapter}`}>
              <a>{chapter}</a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

// export async function getServerSideProps({ params: { abbrev } }) {
//   const url = `https://www.abibliadigital.com.br/api/books/${abbrev}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMTggMjAyMCAwMDozMDo1OCBHTVQrMDAwMC41ZmI0Njg0OTNlZDFiZDAwMjM4MjQxMjQiLCJpYXQiOjE2MDU2NTk0NTh9.6qkfu8HtQSCFmD8n4Dw3aGaeiW4QzMUFXYLShoNiqqI",
//     },
//   });

//   const book = await res.json();

//   return {
//     props: {
//       book,
//     },
//   };
// }
