
import Block from "./Block"
import styles from './Board.module.css'
const Board = (props) => {
    return (
        <div  className={styles.box}>
            {
                props.data.map((row, index) => {
                    return (
                        <div key={index}>

                            {
                                row.map((num, i) => {
                                    return (
                                        <Block key={i} digit={num} />
                                    )
                                })

                            }


                        </div>
                    )
                })
            }
        </div>
    )
}
export default Board