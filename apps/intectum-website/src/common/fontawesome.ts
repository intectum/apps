import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faAppStoreIos,
  faGithub,
  faGooglePlay,
  faLinkedinIn,
  faStackExchange,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesDown,
  faArrowsRotate,
  faArrowUpRightFromSquare,
  faEnvelope,
  faFilePdf,
  faFolderOpen,
  faGamepad,
  faGears,
  faPhone,
  faUserTie,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;
library.add(
  faAngleLeft,
  faAngleRight,
  faAnglesDown,
  faAppStoreIos,
  faArrowsRotate,
  faArrowUpRightFromSquare,
  faEnvelope,
  faFilePdf,
  faFolderOpen,
  faGamepad,
  faGears,
  faGithub,
  faGooglePlay,
  faLinkedinIn,
  faPhone,
  faStackExchange,
  faUserTie,
  faWhatsapp,
  faXmark
);
