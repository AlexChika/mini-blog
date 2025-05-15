"use client";

import { useEffect, useState } from "react";
import { ProjectOverviewModal } from "./projectOverview";

function ProjectOverview() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ProjectOverviewModal />;
}

export default ProjectOverview;
