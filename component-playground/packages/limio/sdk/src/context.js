// @flow
import * as React from "react";
import type {
  PageContext,
  LimioContext as LimioContextType,
} from "../../../../types";
import { groupedOfferCopy } from "../../data/offers";

const LimioContext = React.createContext<LimioContextType>();
export const ComponentContext = React.createContext<T>();

export function useLimio(): LimioContextType {
  const context = React.useContext(LimioContext);
  if (context === undefined) {
    throw new Error("useLimio must be used within a LimioProvider");
  }
  return context;
}

type LimioProviderProps = {
  children: React.Node,
  value: LimioContextType,
};

export function LimioProvider({
  children,
  value = dummyContext,
}: LimioProviderProps): React.Node {
  return (
    <LimioContext.Provider value={value}>{children}</LimioContext.Provider>
  );
}

export function useComponentProps<T>(defaultProps: $Shape<T>): T {
  const context = React.useContext(ComponentContext);
  console.log("context", context);
  console.log("defaultProps", defaultProps);
  if (context === undefined) {
    throw new Error("useComponentProps must be used within a ComponentContext");
  }

  // limit changes - both context and defaultProps should be static objects
  const componentProps = React.useMemo(() => {
    return { ...defaultProps, ...context };
  }, [context, defaultProps]);

  return componentProps;
}

const dummyContext = {
  shop: {
    campaign: {
      name: "Dummy Campaign",
      path: "/offers/Dummy Campaign",
      attributes: {
        push_to_checkout__limio: true,
      },
    },
    offers: groupedOfferCopy,
    tag: "/tags/limio",
    location: { pathname: "/dummy" },
    basketItems: [],
    addToBasket: () => {
      // eslint-disable-next-line no-console
      console.log("Item added to basket");
    },
  },
  user: {
    attributes: {
      aud: "3kde1g4qurqbdmf7p81n6568m0",
      auth_time: 1610643100,
      "cognito:username": "dummy_user",
      email: "dummy@limio.com",
      email_verified: true,
      event_id: "743826f5-075c-4c36-8bb2-bf343be46f09",
      exp: 1611848843,
      iat: 1611845243,
      iss: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_AVrsbOxSU",
      sub: "d183e0ec-8baf-4320-b847-c78fad0b1df8",
      token_use: "id",
    },
    loaded: true,
    token:
      "eyJraWQiOiJrdHFNMjE0WnlZRlhRVklEMGRCUTJ3Y1NRUThtMytJU1QwUHoyc0YyUGVZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMTgzZTBlYy04YmFmLTQzMjAtYjg0Ny1jNzhmYWQwYjFkZjgiLCJldmVudF9pZCI6Ijc0MzgyNmY1LTA3NWMtNGMzNi04YmIyLWJmMzQzYmU0NmYwOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTA2NDMxMDAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX0FWcnNiT3hTVSIsImV4cCI6MTYxMTg0ODg0MywiaWF0IjoxNjExODQ1MjQzLCJqdGkiOiIxNGZlMmVmMi1lYTM5LTQ3ZjItYmNlYS00YzkwOWJjMGQzNmMiLCJjbGllbnRfaWQiOiIza2RlMWc0cXVycWJkbWY3cDgxbjY1NjhtMCIsInVzZXJuYW1lIjoiZDE4M2UwZWMtOGJhZi00MzIwLWI4NDctYzc4ZmFkMGIxZGY4In0.coUsZ637mhna85v0uFtWVKOgG084xOlihyXABx5fmOcJBWXl9tJWgUDwH_7p5VYa_hCFf9mUzS-BPn7TgApBN99Hf6EXbTfWyD28yjynaNDhLu_yBie6g_FxVI_ovhsz-vdKZ8kaW5pUvbqQxnfhK-UmdMhCs4-CGldpNvYTWQqQT7epyI0luMtWht3BLhlyAndHhcCmoO59dLCCejvODl7tmBas2C1Po-UOU-MqQ3S4M5WQ_FEwAWdBK9laTfVqF2wOkMGqapDfAPFGrH0lDDld5USTJCeZOTqkx7RE6pk2xONVNNxwVTiNJN0C2CKbWv97UL2HG1h41PrC9UQ6ec",
  },
};
