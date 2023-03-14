import { UserView } from "../../../presentation/views";
import UseUsersProvider from "../../../domain/context/users-context";
export const MakeUserView = () => (
    <UseUsersProvider>
        <UserView />
    </UseUsersProvider>
) 