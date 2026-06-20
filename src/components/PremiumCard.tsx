import React from "react";
import styles from "./PremiumCard.module.css";
import Image from "next/image";

interface PremiumCardProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  badge?: string;
}

export function PremiumCard({ title, description, price, imageSrc, badge }: PremiumCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__shine}></div>
      <div className={styles.card__glow}></div>
      <div className={styles.card__content}>
        {badge && <div className={styles.card__badge}>{badge}</div>}
        <div className={styles.card__image}>
          <Image src={imageSrc} alt={title} fill sizes="180px" />
        </div>
        <div className={styles.card__text}>
          <p className={styles.card__title}>{title}</p>
          <p className={styles.card__description}>{description}</p>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__price}>{price}</div>
          <div className={styles.card__button}>
            <svg height="14" width="14" viewBox="0 0 24 24">
              <path
                strokeWidth="2.5"
                stroke="currentColor"
                d="M4 12H20M12 4V20"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
