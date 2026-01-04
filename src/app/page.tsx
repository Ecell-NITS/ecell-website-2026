import Footer from "@/components/Footer/Footer";
import Faculties from "@/components/Teampage/Faculties/Faculties";

export default function TeamPage() {
  return (
    <>
      <section className="team-hero">
        <h1 className="team-hero-title">Our Team</h1>
      </section>

      <section className="team-content">
        <div className="team-section-container">
          <div className="team-tabs">
            <button className="team-tab active">Faculty</button>
            <button className="team-tab">Alumni</button>
            <button className="team-tab">Core Team 2025-2026 ▾</button>
            <button className="team-tab">Developers</button>
          </div>

          <Faculties />
        </div>
      </section>

      <Footer />
    </>
  );
}
