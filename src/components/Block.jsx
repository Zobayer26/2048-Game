const Block = (props ) => {
    const { blockStyle } = style;
    let val=props.digit
    return (
      <div
        style={{
          ...blockStyle,
          background: getColors(val),
          color: val === 2 || val === 4 ? "#645B52" : "#F7F4EF",
        }}
      >
        {val !== 0 ? val: ""}
      </div>
    );
  };
export default Block

const style={
    blockStyle: {
        height: 106,
        width: 106,
        background:" rgba(238,228,218,.35)",
        margin: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 45,
        fontWeight: "800",
        color:"#fff"
      }
}






const getColors = (num) => {
    switch (num) {
      case 2:
        return "#EBDCD0";
      case 4:
        return "#E9DBBA";
      case 8:
        return "#E9A067";
      case 16:
        return "#F08151";
      case 32:
        return "#F2654F";
      case 64:
        return "#F1462C";
      case 128:
        return "#E7C65E";
      case 256:
        return "#E8C350";
      case 512:
        return "#E8BE40";
      case 1024:
        return "#E8BB31";
      case 2048:
        return "#E7B723";
      default:
        return "#C2B3A3";
    }}
// const Block = ({props}) => {
//     let value=props.digit
//     return (
//         <div className={styles.block}>
//             <div style={value===2?{background:"#F2654F",width:"106px",height:"106px",textAlign:"center"} : {background:"rgba(238,228,218,.35)"} }>
//             {value> 0? value :"" }
//             </div>
//         </div>
//     )
// }
// export default Block