import Link from "next/link";

import { BiMenuAltRight } from "react-icons/bi";

export default function Navbar() {
  return (
    <div style={styleDiv}>
      <Link href={`/`}>
        <a>
          <h1 style={styleH1}>
            <span style={styleSpan}>on</span>
            Bíblia
          </h1>
        </a>
      </Link>

      <BiMenuAltRight size={`2rem`} style={{ cursor: "default" }} />
    </div>
  );
}

const styleDiv = {
  position: "sticky",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1rem",
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  zIndex: "100",
};

const styleH1 = {
  color: "#2d3436",
  fontFamily: "Lemonada, cursive",
  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.15)",
};

const styleSpan = {
  color: "#74b9ff",
  fontFamily: "Lemonada, cursive",
};
