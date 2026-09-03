import { ReactComponent as GradientScanFillIcon } from "../assets/defaultTheme/gradient-scan-icon.svg";
import { ReactComponent as WhiteScanFillIcon } from "../assets/defaultTheme/white-scan-icon.svg";
import { ReactComponent as GradientTabUploadIcon } from "../assets/defaultTheme/gradient-upload-icon.svg";
import { ReactComponent as WhiteTabUploadIcon } from "../assets/defaultTheme/white-upload-icon.svg";
import { ReactComponent as QrCodeIcon } from "../assets/defaultTheme/qr-code-icon.svg";
import { ReactComponent as CameraDeniedIcon } from "../assets/defaultTheme/camera-access-denied-icon.svg";
import { ReactComponent as DocumentFileIcon } from "../assets/defaultTheme/document.svg";
import { ReactComponent as VerificationSuccess } from "../assets/defaultTheme/verification-success-icon.svg";
import { ReactComponent as VerificationFailed } from "../assets/defaultTheme/verification-failed-icon.svg";
import { ReactComponent as GlobeSvgIcon } from "../assets/defaultTheme/globe.svg";
import { ReactComponent as ArrowDownSvgIcon } from "../assets/defaultTheme/arrow-down.svg";
import { ReactComponent as ArrowUpSvgIcon } from "../assets/defaultTheme/arrow-up.svg";
import { ReactComponent as CheckSvgIcon } from "../assets/defaultTheme/check.svg";
import { ReactComponent as UnderConstructionLogo } from "../assets/defaultTheme/under-construction.svg";
import { ReactComponent as Search } from "../assets/defaultTheme/search.svg";
import { ReactComponent as FilterLines } from "../assets/defaultTheme/filter-lines.svg";
import { ReactComponent as Download } from "../assets/defaultTheme/download.svg";
import { ReactComponent as WhiteDownload } from "../assets/defaultTheme/white-download.svg";
import { ReactComponent as ReGenerate } from "../assets/defaultTheme/re-generate.svg";
import { ReactComponent as WhiteReGenerate } from "../assets/defaultTheme/white-regenerate.svg";
import { ReactComponent as CrossIcon } from "../assets/defaultTheme/close_icon.svg";
import { ReactComponent as HamburgerIcon } from "../assets/defaultTheme/hamburger-menu.svg";
import { ReactComponent as TabIcon } from "../assets/defaultTheme/new-tab.svg";
import { ReactComponent as VectorDownArrow } from "../assets/defaultTheme/vector-arrow-down.svg";
import { ReactComponent as VectorUpArrow } from "../assets/defaultTheme/vector-arrow-up.svg";
import { ReactComponent as VectorExpandIcon } from "../assets/defaultTheme/vector-expand.svg";
import { ReactComponent as VectorCollapseIcon } from "../assets/defaultTheme/vector-collapse.svg";
import { ReactComponent as VectorDownloadIcon } from "../assets/defaultTheme/vector-download.svg";
import { ReactComponent as SharableLinkIcon } from "../assets/defaultTheme/sharable-link.svg";
import ScannerOutline from "../assets/defaultTheme/scanner-outline.svg";
import QrOutline from "../assets/defaultTheme/qr-code-outline.svg";
import VectorOutline from "../assets/defaultTheme/vector-icon-outline.svg";

// Create simple geometric shapes for bank branding
const BankLogo = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="8" fill="var(--iv-primary-color)" />
    <rect width="40" height="30" x="10" y="15" rx="4" fill="var(--iv-accent-color)" />
  </svg>
);

const BankTextLogo = () => (
  <svg width="180" height="40" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-weight="700" font-size="18"
          fill="var(--iv-primary-color)">
      Apex Bank
    </text>
    <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-weight="400" font-size="12"
          fill="var(--iv-header-description-text)">
      Credential Verification
    </text>
  </svg>
);

const defaultTheme = {
  Logo: BankLogo,
  InjiLogo: BankTextLogo, // Replacing InjiLogo with bank text logo
  QrIcon: QrCodeIcon,
  GradientScanIcon: GradientScanFillIcon,
  WhiteScanIcon: WhiteScanFillIcon,
  GradientUploadIcon: GradientTabUploadIcon,
  WhiteUploadIcon: WhiteTabUploadIcon,
  CameraAccessDeniedIcon: CameraDeniedIcon,
  DocumentIcon: DocumentFileIcon,
  VerificationSuccessIcon: VerificationSuccess,
  VerificationFailedIcon: VerificationFailed,
  ScanOutline: ScannerOutline,
  GlobeIcon: GlobeSvgIcon,
  ArrowDown: ArrowDownSvgIcon,
  ArrowUp: ArrowUpSvgIcon,
  Check: CheckSvgIcon,
  UnderConstruction: UnderConstructionLogo,
  DownloadIcon: Download,
  WhiteDownloadIcon: WhiteDownload,
  SearchIcon: Search,
  QrCodeOutLine: QrOutline,
  FilterLinesIcon: FilterLines,
  ReGenerateIcon: ReGenerate,
  WhiteReGenerateIcon: WhiteReGenerate,
  CloseIcon: CrossIcon,
  MenuIcon: HamburgerIcon,
  NewTabIcon: TabIcon,
  VectorDown: VectorDownArrow,
  VectorUp: VectorUpArrow,
  VectorOutline: VectorOutline,
  VectorExpand: VectorExpandIcon,
  VectorCollapse: VectorCollapseIcon,
  VectorDownload: VectorDownloadIcon,
  SharableLink: SharableLinkIcon,
};

export default defaultTheme;
