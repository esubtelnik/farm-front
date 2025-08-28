"use client";
import { FC } from 'react'

const Skeleton: FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );

export default Skeleton