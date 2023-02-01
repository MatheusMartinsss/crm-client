import UseNegociacaoProvider from "../../../domain/context/useNegociacao"
import { HomeView } from "../../../presentation/views"
export const MakeHomeView = () => <UseNegociacaoProvider>
    <HomeView />
</UseNegociacaoProvider>