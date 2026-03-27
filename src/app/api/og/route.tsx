import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters with fallbacks
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "E-Cell NIT Silchar";

    const description =
      searchParams.get("description")?.slice(0, 200) ??
      "Promoting and nurturing the entrepreneurial spirit among students of NIT Silchar.";

    const label = searchParams.get("label")?.slice(0, 50) ?? "E-Cell NITS";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Glowing Gradients */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-100px",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(2,6,23,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(2,6,23,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top Header & Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* E-Cell Logo */}
          <img
            src={new URL("/ecelllogo.png", req.url).toString()}
            width="80"
            height="80"
            alt="E-Cell Logo"
            style={{ objectFit: "contain" }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(59, 130, 246, 0.1)",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              padding: "8px 24px",
              borderRadius: "999px",
              color: "#60A5FA",
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>

        {/* Main Central Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "auto",
            marginBottom: "auto",
            maxWidth: "1000px",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontStyle: "italic",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 500,
              color: "#cbd5e1",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "850px",
            }}
          >
            {description}
          </p>
        </div>

        {/* Bottom Footer Border & Branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            borderTop: "2px solid rgba(255,255,255,0.1)",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            ecellnits.org
          </div>
          <div
            style={{
              display: "flex",
              color: "#94a3b8",
              fontSize: "24px",
            }}
          >
            Fostering Innovation & Leadership
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMsg);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
