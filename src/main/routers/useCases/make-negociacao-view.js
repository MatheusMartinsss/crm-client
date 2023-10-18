import UseNegociacaoProvider from "../../../domain/context/useNegociacao"
import { NegociacaoView } from "../../../presentation/views"
export const MakeNegociacaoView = () => (
    <UseNegociacaoProvider>
        <NegociacaoView />
    </UseNegociacaoProvider>
) 