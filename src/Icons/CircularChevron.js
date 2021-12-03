export function CircularChevron({ direction = 'right', size = '32' }) {
  const randomKey = Math.random();
  return (
    <svg
      style={{
        transformOrigin: 'center center',
        transform: direction === 'right' ? 'rotate(180deg)' : '',
      }}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <defs>
        <mask id={`arrow-whole-${direction}-${randomKey}`}>
          <circle r="12" cx="12" cy="12" fill="white" />
          <path
            d="M9.4,17.9c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l4.5-4.8L8.9,7.1c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0
              l5.5,5.8L10,17.7C9.9,17.9,9.6,17.9,9.4,17.9z"
            fill="black"
          ></path>
        </mask>
      </defs>
      <circle
        fill="white"
        r="12"
        cx="12"
        cy="12"
        mask={`url(#arrow-whole-${direction}-${randomKey})`}
      />
      <path
        d="M9.4,17.9c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l4.5-4.8L8.9,7.1c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0
              l5.5,5.8L10,17.7C9.9,17.9,9.6,17.9,9.4,17.9z"
        fill="black"
        fillOpacity="0.1"
      ></path>
    </svg>
  );
}
