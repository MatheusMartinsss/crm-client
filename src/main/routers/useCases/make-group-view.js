import { GroupsView } from "../../../presentation/views/groups/groups-view";
import UseGroupProvider from "../../../domain/context/group-context";
export const MakeGroupView = () => (
    <UseGroupProvider>
        <GroupsView />
    </UseGroupProvider>
)