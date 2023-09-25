import { DingtalkOutlined } from "@ant-design/icons";
import { navStyles as style } from "../Util/TSXstyles";
function NavPage() {
  return (
    <div style={style.body}>
      <div style={style.firstDiv}>
        <h3>
          <DingtalkOutlined />
          Inventory App
        </h3>
        <br />
      </div>
    </div>
  );
}
export default NavPage;
