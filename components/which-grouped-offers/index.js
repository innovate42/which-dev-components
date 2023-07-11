// @flow
import * as React from "react"
import { useMemo, useState } from "react"
import { useLimio, groupOffers } from "@limio/sdk"
import OfferGroup from "./components/OfferGroup.js"
import "./index.css"

export function GroupedOffers({ componentId, groupLabels = [], bestValueText, termsURL }): React.Node {

  const {
    shop: { offers },} = useLimio();

  const offerGroups = useMemo(() => {
    return groupOffers(offers, groupLabels)
  }, [offers, groupLabels])

  const [selectedGroup, setSelectedGroup] = useState(offerGroups.map((group) => group.groupId))

  return (
    <div
      id={componentId || "grouped-offers-component"}
      className="grouped-offers"
    >
      <div className="grouped-offers-wrapper">
        {offerGroups.map((offerGroup, index) => {
          const { groupId, id, label, offers, thumbnail } = offerGroup;

          return (
            <OfferGroup
              key={`offer-group-${index}`}
              groupId={groupId}
              id={id}
              label={label}
              offers={offers}
              bestValueText={bestValueText}
              thumbnail={thumbnail}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          );
        })}
      </div>
      <a href={termsURL} className="grouped-offers-terms">
        Benny
      </a>
    </div>
  );
}

GroupedOffers.whyDidYouRender = true;

export default GroupedOffers;
