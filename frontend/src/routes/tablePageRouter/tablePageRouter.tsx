import Menu from "../../fragments/menu/menu.tsx"
import "./tablePageRouter.scss"
import Table from "../../fragments/table/table.tsx"

export default function tablePageRouter(){
    return(
        <div className="App">
            <Menu></Menu>
            <Table></Table>
        </div>
    )
}