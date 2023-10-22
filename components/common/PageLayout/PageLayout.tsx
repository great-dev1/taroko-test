import { FC, ReactNode } from "react";

import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  navbar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

const PageLayout: FC<React.PropsWithChildren<PageLayoutProps>> = ({
  navbar,
  header,
  footer,
  children,
}) => {
  return (
    <div className={styles.root}>
      {navbar && <div className={styles.navbar}>{navbar}</div>}
      {header && <div className={styles.header}>{header}</div>}
      <div>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default PageLayout;
