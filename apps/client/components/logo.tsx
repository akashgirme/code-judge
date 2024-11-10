interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ height = 60, width = 60 }: LogoProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0H44C52.8366 0 60 7.16344 60 16V44C60 52.8366 52.8366 60 44 60H16C7.16344 60 0 52.8366 0 44V16Z"
        fill="#EEE9F7"
      />
      <path
        d="M39.9028 13.8443L32.3288 9.62588C30.8802 8.81768 29.0798 8.81768 27.6106 9.62588L12.3177 18.1415C10.8898 18.93 10 20.4084 10 21.9853V36.316C10 38.6026 12.6074 40.0219 14.6768 38.8786L29.9697 30.363L23.5546 26.7951C22.0232 25.9277 22.0232 23.8186 23.5546 22.9512L39.9028 13.8443Z"
        fill="#5026AE"
      />
      <path
        d="M14.8219 21.867L23.6168 26.7556C22.0854 25.8883 22.0854 23.7791 23.6168 22.9118L39.9237 13.8245L32.3497 9.60615C30.9011 8.79795 29.1007 8.79795 27.6314 9.60615L14.8219 16.7419C12.7525 17.9049 12.7525 20.7237 14.8219 21.867Z"
        fill="#8567C6"
      />
      <path
        d="M20.0972 46.8224L27.6712 51.0408C29.1198 51.849 30.9201 51.849 32.3894 51.0408L47.6823 42.5252C49.1102 41.7367 50 40.2583 50 38.6813V24.3507C50 22.0641 47.3926 20.6448 45.3232 21.7881L30.0303 30.3037L36.4454 33.8716C37.9768 34.7389 37.9768 36.8481 36.4454 37.7154L20.0972 46.8224Z"
        fill="#5026AE"
      />
      <path
        d="M45.199 38.7996L36.4041 33.911C37.9354 34.7784 37.9354 36.8876 36.4041 37.7549L20.0972 46.8422L27.6712 51.0605C29.1198 51.8687 30.9201 51.8687 32.3894 51.0605L45.199 43.9248C47.2477 42.7618 47.2477 39.9429 45.199 38.7996Z"
        fill="#8567C6"
      />
    </svg>
  );
};