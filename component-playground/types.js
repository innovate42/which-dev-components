// @flow
// note that these are imported via .flowconfig to avoid having a dependency on @i42/shared
import type { Offer as OfferType, Order, OrderItem, Product, Subscription, CatalogItem } from "@limio/types"

type Offer = CatalogItem<OfferType>

type CampaignInfo = {
    name: string,
    path: string,
    attributes: { [string]: any }
}

type LandingInfo = {
    inlineStyle: ?string,
    customTranslations: { [string]: string },
    favicon: ?string,
    shop_title: ?string,
    domain_url: ?string
}

type OfferGroup = {
    id: string,
    label: string
}

export type PageContext = {
    endpoint?: string,
    authProvider: ?string,
    landing: LandingInfo,
    campaign: CampaignInfo,
    offers: Array<Offer>,§
    groupValues: Array<OfferGroup>,
    publicKey__limio: string,
    tag__limio: string,
    pageMasterLayout: string,
    prevent_mixed_rates: boolean
}

type AddToBasket = (item: Offer, selectedProducts: ?(Product[]), quantity: ?number, redirectUrl: ?string) => void
type AddGiftToBasket = (offerItems: Offer[], giftCode: string, hasDeliver: boolean) => void
type RemoveFromBasket = (item: Offer) => void
type UpdateOrder = (order: Order) => void
type GoToCheckout = (basketId?: string) => Promise<void>

export type LimioContext = {
    endpoint: ?string,
    shop: {
        location: {
            pathname: string,
            search: string
        },
        language: {
            mode: string,
            value: string
        },
        addToBasket: AddToBasket,
        addGiftToBasket: AddGiftToBasket,
        removeFromBasket: RemoveFromBasket,
        updateOrder: UpdateOrder,
        goToCheckout: GoToCheckout,
        basketItems: OrderItem[],
        basketOpen: boolean,
        setBasketOpen: boolean => void,
        formattedTotal: ?string,
        campaign: CampaignInfo,
        offers: Offer[],
        tag: string,
        customTranslations: { [string]: any },
        updateCheckoutDisabled: boolean => {
            type: "SET_CHECKOUT_DISABLED",
            disabled: boolean
        },
        groupValues: Array<OfferGroup>
    },
    pageBuilder__limio?: boolean,
    user: User,
    key: {
        limio: string
    }
}

export type User = {
    token: ?string,
    loaded?: boolean,
    attributes?: { [string]: any },
    loginStatus?: "logged-out" | "logged-in",
    subscriptions?: Subscription[],
    refreshUser?: () => Promise<void>
}
s