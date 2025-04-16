'use client';

import React from 'react';
import Image from 'next/image';

interface SolaLogoProps {
  className?: string;
}

export default function SolaLogo({
  className,
}: SolaLogoProps): React.ReactElement {
  return (
    <Image
      src="/solai.png"
      alt="sola-ai Logo"
      width={40}
      height={40}
      className={className}
    />
  );
}
