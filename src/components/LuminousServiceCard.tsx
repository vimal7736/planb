"use client";

import { useState } from "react";
import { Service } from "@/lib/supabase";
import styles from "./LuminousServiceCard.module.css";

interface LuminousServiceCardProps {
  service: Service;
  defaultLit?: boolean;
}

export default function LuminousServiceCard({
  service,
  defaultLit = false,
}: LuminousServiceCardProps) {
  const [isLit, setIsLit] = useState(defaultLit);

  return (
    <div className={`${styles.card} ${isLit ? styles.lit : ""}`}>
      <div className={styles.lightLayer} aria-hidden="true">
        <div className={styles.slit} />
        <div className={styles.lumen}>
          <div className={styles.min} />
          <div className={styles.mid} />
          <div className={styles.hi} />
        </div>
        <div className={styles.darken}>
          <div className={styles.sl} />
          <div className={styles.ll} />
          <div className={styles.slt} />
          <div className={styles.srt} />
        </div>
      </div>

      <div className={styles.content}>
        {/* Illuminated Description Zone */}
        <div className={styles.descriptionZone}>
          <p className={styles.description}>{service.description}</p>
        </div>

        {/* Bottom Title & Toggle */}
        <div className={styles.bottom}>
          <div className={styles.titleGroup}>
            <svg
              className={styles.miniIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <h4 className={`${styles.title} font-serif`}>{service.title}</h4>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isLit}
            aria-label={`Illuminate ${service.title}`}
            className={`${styles.toggle} ${isLit ? styles.toggleActive : ""}`}
            onClick={() => setIsLit((prev) => !prev)}
          >
            <div className={styles.handle} />
            <span className={styles.toggleLabel}>
              {isLit ? "Lit" : "Light"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
