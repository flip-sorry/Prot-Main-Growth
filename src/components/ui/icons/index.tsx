// Icons from Figma design

export const HomeIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.66669L2.5 7.50002V17.5H12.5L17.5 12.5V7.50002L10 1.66669ZM15.8333 11.6667H11.6667V15.8334L15.8333 11.6667Z" fill="#248567"/>
    </svg>
  </div>
);

export const DocumentsIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 1.66666V18.3333H16.6666V5.83249L12.5 1.66666H3.33331ZM4.99998 3.33332H10.8333V7.49999H15V16.6667H4.99998V3.33332Z" fill="#474747"/>
    </svg>
  </div>
);

export const TemplatesIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 1.66666V18.3333H16.6666V5.83249L12.5 1.66666H3.33331ZM4.99998 3.33332H10.8333V7.49916H15V9.99999H4.99998V3.33332ZM9.16665 16.6667H15V11.6667H9.16665V16.6667ZM4.99998 16.6667H7.50081V11.6667H4.99998V16.6667Z" fill="#474747"/>
    </svg>
  </div>
);

export const ContactsIcon = ({ className = '' }: { className?: string }) => (
  <div className={`overflow-clip relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M0.833313 16.6667V14.3333C0.833313 13.8611 0.954841 13.4271 1.1979 13.0313C1.44095 12.6354 1.76387 12.3333 2.16665 12.125C3.02776 11.6945 3.90276 11.3715 4.79165 11.1563C5.68054 10.941 6.58331 10.8333 7.49998 10.8333C8.41665 10.8333 9.31942 10.941 10.2083 11.1563C11.0972 11.3715 11.9722 11.6945 12.8333 12.125C13.2361 12.3333 13.559 12.6354 13.8021 13.0313C14.0451 13.4271 14.1666 13.8611 14.1666 14.3333V16.6667H0.833313ZM15.8333 16.6667V14.1667C15.8333 13.5556 15.6632 12.9688 15.3229 12.4063C14.9826 11.8438 14.5 11.3611 13.875 10.9583C14.5833 11.0417 15.25 11.184 15.875 11.3854C16.5 11.5868 17.0833 11.8333 17.625 12.125C18.125 12.4028 18.5069 12.7118 18.7708 13.0521C19.0347 13.3924 19.1666 13.7639 19.1666 14.1667V16.6667H15.8333ZM7.49998 10C6.58331 10 5.79859 9.67362 5.14581 9.02084C4.49304 8.36807 4.16665 7.58334 4.16665 6.66668C4.16665 5.75001 4.49304 4.96529 5.14581 4.31251C5.79859 3.65973 6.58331 3.33334 7.49998 3.33334C8.41665 3.33334 9.20137 3.65973 9.85415 4.31251C10.5069 4.96529 10.8333 5.75001 10.8333 6.66668C10.8333 7.58334 10.5069 8.36807 9.85415 9.02084C9.20137 9.67362 8.41665 10 7.49998 10ZM15.8333 6.66668C15.8333 7.58334 15.5069 8.36807 14.8541 9.02084C14.2014 9.67362 13.4166 10 12.5 10C12.3472 10 12.1528 9.98265 11.9166 9.94793C11.6805 9.9132 11.4861 9.87501 11.3333 9.83334C11.7083 9.3889 11.9965 8.89584 12.1979 8.35418C12.3993 7.81251 12.5 7.25001 12.5 6.66668C12.5 6.08334 12.3993 5.52084 12.1979 4.97918C11.9965 4.43751 11.7083 3.94445 11.3333 3.50001C11.5278 3.43057 11.7222 3.38543 11.9166 3.36459C12.1111 3.34376 12.3055 3.33334 12.5 3.33334C13.4166 3.33334 14.2014 3.65973 14.8541 4.31251C15.5069 4.96529 15.8333 5.75001 15.8333 6.66668ZM2.49998 15H12.5V14.3333C12.5 14.1806 12.4618 14.0417 12.3854 13.9167C12.309 13.7917 12.2083 13.6945 12.0833 13.625C11.3333 13.25 10.5764 12.9688 9.81248 12.7813C9.04859 12.5938 8.27776 12.5 7.49998 12.5C6.7222 12.5 5.95137 12.5938 5.18748 12.7813C4.42359 12.9688 3.66665 13.25 2.91665 13.625C2.79165 13.6945 2.69095 13.7917 2.61456 13.9167C2.53817 14.0417 2.49998 14.1806 2.49998 14.3333V15ZM7.49998 8.33334C7.95831 8.33334 8.35067 8.17015 8.67706 7.84376C9.00345 7.51737 9.16665 7.12501 9.16665 6.66668C9.16665 6.20834 9.00345 5.81598 8.67706 5.48959C8.35067 5.1632 7.95831 5.00001 7.49998 5.00001C7.04165 5.00001 6.64929 5.1632 6.3229 5.48959C5.99651 5.81598 5.83331 6.20834 5.83331 6.66668C5.83331 7.12501 5.99651 7.51737 6.3229 7.84376C6.64929 8.17015 7.04165 8.33334 7.49998 8.33334Z" fill="#474747"/>
    </svg>
  </div>
);

export const MoreIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 11.6667C4.07748 11.6667 3.33331 10.9208 3.33331 10C3.33331 9.07834 4.07748 8.33334 4.99998 8.33334C5.92081 8.33334 6.66665 9.07834 6.66665 10C6.66665 10.9208 5.92081 11.6667 4.99998 11.6667ZM8.33331 10C8.33331 10.9208 9.07998 11.6667 9.99998 11.6667C10.9216 11.6667 11.6666 10.9208 11.6666 10C11.6666 9.07834 10.9216 8.33334 9.99998 8.33334C9.07998 8.33334 8.33331 9.07834 8.33331 10ZM13.3333 10C13.3333 10.9208 14.0791 11.6667 15 11.6667C15.9208 11.6667 16.6666 10.9208 16.6666 10C16.6666 9.07834 15.9208 8.33334 15 8.33334C14.0791 8.33334 13.3333 9.07834 13.3333 10Z" fill="#474747"/>
    </svg>
  </div>
);

export const DocumentPortraitIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[24px] ${className}`}>
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 1.66666V18.3333H16.6666V5.83249L12.5 1.66666H3.33331ZM4.99998 3.33332H10.8333V7.49999H15V16.6667H4.99998V3.33332Z" fill="#767676"/>
    </svg>
  </div>
);

export const ViewOptionsIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[24px] ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 12V4H20V12H4ZM18 5.77778H6V10.2222H18V5.77778Z" fill="#767676"/>
      <path d="M4 14V16H20V14H4Z" fill="#767676"/>
      <path d="M4 18V20H20V18H4Z" fill="#767676"/>
    </svg>
  </div>
);

export const ChevronDownIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 10H17L12 15L7 10Z" fill="#767676"/>
    </svg>
  </div>
);

export const WorkspaceStarIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[16px] ${className}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z" fill="#181818" />
    </svg>
  </div>
);

export const WorkspaceChevronIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 16.6667L6.25 12.9167L7.45833 11.7084L10 14.25L12.5417 11.7084L13.75 12.9167L10 16.6667ZM7.45833 8.37502L6.25 7.16669L10 3.41669L13.75 7.16669L12.5417 8.37502L10 5.83335L7.45833 8.37502Z" fill="#ADADAD"/>
    </svg>
  </div>
);

export const SearchIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="9" cy="9" r="6" stroke="#767676" strokeWidth="1.5" fill="none" />
      <path d="M13 13L17 17" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export const MoreOptionsIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="10" cy="4" r="1.5" fill="#767676" />
      <circle cx="10" cy="10" r="1.5" fill="#767676" />
      <circle cx="10" cy="16" r="1.5" fill="#767676" />
    </svg>
  </div>
);

// Action buttons icons from Material Symbols Outlined (Google Fonts)
// Using exact SVG paths from provided files: inbox, timeline (work_history), help
export const DocumentImageIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[24px] ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 20V4H20V20H4ZM6 18H18V15H16C15.5 15.6333 14.9042 16.125 14.2125 16.475C13.5208 16.825 12.7833 17 12 17C11.2167 17 10.4792 16.825 9.7875 16.475C9.09583 16.125 8.5 15.6333 8 15H6V18ZM12 15C12.6333 15 13.2083 14.8167 13.725 14.45C14.2417 14.0833 14.6 13.6 14.8 13H18V6H6V13H9.2C9.4 13.6 9.75833 14.0833 10.275 14.45C10.7917 14.8167 11.3667 15 12 15Z" fill="#767676"/>
    </svg>
  </div>
);

export const RecentDocumentsIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[24px] overflow-clip ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 11V3H21V11H3ZM19 9H5V5H19V9Z" fill="#767676"/>
      <path d="M13.101 13C12.5151 13.5741 12.0297 14.2504 11.6736 15H5V19H11.0709C11.1719 19.7061 11.3783 20.3783 11.6736 21H3V13H13.101Z" fill="#767676"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 23C16.6167 23 15.4375 22.5125 14.4625 21.5375C13.4875 20.5625 13 19.3833 13 18C13 16.6167 13.4875 15.4375 14.4625 14.4625C15.4375 13.4875 16.6167 13 18 13C19.3833 13 20.5625 13.4875 21.5375 14.4625C22.5125 15.4375 23 16.6167 23 18C23 19.3833 22.5125 20.5625 21.5375 21.5375C20.5625 22.5125 19.3833 23 18 23ZM19.675 20.375L20.375 19.675L18.5 17.8V15H17.5V18.2L19.675 20.375Z" fill="#767676"/>
    </svg>
  </div>
);

export const HelpQuestionIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[24px] ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M13 17V15H11V17H13Z" fill="#767676"/>
      <path d="M9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.31 14.17 12.42 13 12.82V14H11V12C11 11.45 11.45 11 12 11C12.55 11 13 10.55 13 10C13 9.45 12.55 9 12 9C11.45 9 11 9.45 11 10H9Z" fill="#767676"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM12 19C8.14 19 5 15.859 5 12C5 8.141 8.14 5 12 5C15.86 5 19 8.141 19 12C19 15.859 15.86 19 12 19Z" fill="#767676"/>
    </svg>
  </div>
);

export const SignOutIcon = ({ className = '' }: { className?: string }) => (
  <div className={`relative shrink-0 size-[20px] ${className}`}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4.16667 17.5H10.8333V15.8333H4.16667V4.16667H10.8333V2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5ZM13.3333 13.75L12.1583 12.575L13.8083 10.8333H7.5V9.16667H13.8083L12.1583 7.425L13.3333 6.25L17.0833 10L13.3333 13.75Z" fill="#767676"/>
    </svg>
  </div>
);
