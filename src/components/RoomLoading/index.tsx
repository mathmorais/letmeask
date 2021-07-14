import { useState } from "react";
import "./styles.scss";

export const RoomLoading: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const [needRender, setNeedRender] = useState(isLoading);

  if (needRender) {
    return (
      <div
        style={{ opacity: isLoading ? 1 : 0 }}
        onTransitionEnd={() => setNeedRender(false)}
        id="loading-container"
      >
        <main>
          <div className="loading">
            <div className="loading-square"></div>
          </div>
        </main>
      </div>
    );
  }
  return <></>;
};
