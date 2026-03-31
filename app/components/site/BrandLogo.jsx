export default function BrandLogo({ className = '', variant = 'stacked' }) {
  if (variant === 'inline') {
    return (
      <svg
        viewBox="0 0 328 110"
        className={className}
        role="img"
        aria-label="ROBEL logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="328" height="110" fill="transparent" />

        <rect x="8" y="13" width="56" height="64" rx="4" fill="#eeeeee" />
        <rect x="14" y="18" width="22" height="54" fill="#2a2746" />
        <circle cx="49" cy="31" r="12" fill="#eb2429" />

        <text
          x="84"
          y="64"
          fill="#2a2746"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="400"
          letterSpacing="-2.5"
        >
          ROB
        </text>
        <text
          x="216"
          y="64"
          fill="#eb2429"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="400"
          letterSpacing="-2.5"
        >
          E
        </text>
        <text
          x="248"
          y="64"
          fill="#2a2746"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="400"
          letterSpacing="-2.5"
        >
          L
        </text>

        <rect x="85" y="78" width="42" height="3.5" rx="1.75" fill="#eb2429" />
        <rect x="132" y="78" width="42" height="3.5" rx="1.75" fill="#4c4468" />

        <text
          x="180"
          y="84"
          fill="#3f3a3d"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.1"
        >
          LET&apos;S WE CREATE
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 398 264"
      className={className}
      role="img"
      aria-label="ROBEL logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="398" height="264" fill="transparent" />

      <rect x="164" y="42" width="77" height="84" fill="#eeeeee" />
      <rect x="171" y="49" width="28" height="70" fill="#2a2746" />
      <circle cx="215" cy="66" r="15" fill="#eb2429" />

      <text
        x="76"
        y="196"
        fill="#2a2746"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="75"
        fontWeight="400"
        letterSpacing="-3"
      >
        ROB
      </text>
      <text
        x="245"
        y="196"
        fill="#eb2429"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="75"
        fontWeight="400"
        letterSpacing="-3"
      >
        E
      </text>
      <text
        x="286"
        y="196"
        fill="#2a2746"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="75"
        fontWeight="400"
        letterSpacing="-3"
      >
        L
      </text>

      <rect x="76" y="206" width="56" height="4" rx="2" fill="#eb2429" />
      <rect x="135" y="206" width="54" height="4" rx="2" fill="#4c4468" />

      <text
        x="193"
        y="219"
        fill="#3f3a3d"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="1.4"
      >
        LET&apos;S WE CREATE
      </text>
    </svg>
  );
}

