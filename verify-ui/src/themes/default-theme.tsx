import { ReactComponent as GradientScanFillIcon } from "../assets/purpleTheme/gradient-scan-icon.svg";
import { ReactComponent as WhiteScanFillIcon } from "../assets/purpleTheme/white-scan-icon.svg";
import { ReactComponent as GradientTabUploadIcon } from "../assets/purpleTheme/gradient-upload-icon.svg";
import { ReactComponent as WhiteTabUploadIcon } from "../assets/purpleTheme/white-upload-icon.svg";
import { ReactComponent as QrCodeIcon } from "../assets/purpleTheme/qr-code-icon.svg";
import { ReactComponent as CameraDeniedIcon } from "../assets/purpleTheme/camera-access-denied-icon.svg";
import { ReactComponent as DocumentFileIcon } from "../assets/purpleTheme/document.svg";
import { ReactComponent as VerificationSuccess } from "../assets/purpleTheme/verification-success-icon.svg";
import { ReactComponent as VerificationFailed } from "../assets/purpleTheme/verification-failed-icon.svg";
import { ReactComponent as GlobeSvgIcon } from "../assets/purpleTheme/globe.svg";
import { ReactComponent as ArrowDownSvgIcon } from "../assets/purpleTheme/arrow-down.svg";
import { ReactComponent as ArrowUpSvgIcon } from "../assets/purpleTheme/arrow-up.svg";
import { ReactComponent as CheckSvgIcon } from "../assets/purpleTheme/check.svg";
import { ReactComponent as UnderConstructionLogo } from "../assets/purpleTheme/under-construction.svg";
import { ReactComponent as Search } from "../assets/purpleTheme/search.svg";
import { ReactComponent as FilterLines } from "../assets/purpleTheme/filter-lines.svg";
import { ReactComponent as Download } from "../assets/purpleTheme/download.svg";
import { ReactComponent as WhiteDownload } from "../assets/purpleTheme/white-download.svg";
import { ReactComponent as ReGenerate } from "../assets/purpleTheme/re-generate.svg";
import { ReactComponent as WhiteReGenerate } from "../assets/purpleTheme/white-regenerate.svg";
import { ReactComponent as CrossIcon } from "../assets/purpleTheme/close_icon.svg";
import { ReactComponent as HamburgerIcon } from "../assets/purpleTheme/hamburger-menu.svg";
import { ReactComponent as TabIcon } from "../assets/purpleTheme/new-tab.svg";
import { ReactComponent as VectorDownArrow } from "../assets/purpleTheme/vector-arrow-down.svg";
import { ReactComponent as VectorUpArrow } from "../assets/purpleTheme/vector-arrow-up.svg";
import { ReactComponent as VectorExpandIcon } from "../assets/purpleTheme/vector-expand.svg";
import { ReactComponent as VectorCollapseIcon } from "../assets/purpleTheme/vector-collapse.svg";
import { ReactComponent as VectorDownloadIcon } from "../assets/purpleTheme/vector-download.svg";
import { ReactComponent as SharableLinkIcon } from "../assets/purpleTheme/sharable-link.svg";
import ScannerOutline from "../assets/purpleTheme/scanner-outline.svg";
import QrOutline from "../assets/purpleTheme/qr-code-outline.svg";
import VectorOutline from "../assets/purpleTheme/vector-icon-outline.svg";

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

const purpleTheme = {
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

export default purpleTheme;
