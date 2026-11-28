import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";
import { DESIGNS, ROTATE_EVERY_HOURS, USERNAME } from "./config/designs";
import { useGithub } from "./hooks/useGithub";
import Design from "./components/Design";

/** Picks the design for the current time slot.
 *  Preview any design directly with ?design=1 … ?design=4 */
function designIndexNow(): number {
  const forced = Number(new URLSearchParams(window.location.search).get("design"));
  if (forced >= 1 && forced <= DESIGNS.length) return forced - 1;
  const slot = Math.floor(Date.now() / (ROTATE_EVERY_HOURS * 3_600_000));
  return slot % DESIGNS.length;
}

export default function App() {
  const [index, setIndex] = useState(designIndexNow);
  const { repos, profile, loading } = useGithub(USERNAME);

  // Re-check the schedule every minute so the design switches on time.
  useEffect(() => {
    const id = window.setInterval(() => setIndex(designIndexNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const cfg = DESIGNS[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cfg.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Design cfg={cfg} repos={repos} profile={profile} loading={loading} />
      </motion.div>
    </AnimatePresence>
  );
}