import React from "react";
import { convertToId, convertToTitleCase, getDisplayValue, getImageSrc } from "../../../../utils/misc";
import { SharableLink } from "../../../../utils/theme-utils";
import { AnyVc } from "../../../../types/data-types";

interface VcDetailsGridProps {
  orderedDetails: { key: string; value: any }[];
  vc?: AnyVc;
}

const VcDetailsGrid: React.FC<VcDetailsGridProps> = ({
  orderedDetails,
  vc
}) => {
  return (
    <div className="grid relative lg:grid-cols-12 lg:gap-y-4">
      {orderedDetails.map((label, index) => {
        const isEven = index % 2 === 0;
        const normalizeKey = (key: string) => key.toLowerCase().trim();
        const disclosedClaims =
          vc &&
          typeof vc === "object" &&
          vc !== null &&
          "disclosedClaims" in vc
            ? (vc as { disclosedClaims?: unknown }).disclosedClaims
            : undefined;
        const hasDisclosedClaims =
          disclosedClaims &&
          typeof disclosedClaims === "object" &&
          !Array.isArray(disclosedClaims);

        const isDisclosed = hasDisclosedClaims
          ? Object.keys(disclosedClaims as Record<string, unknown>).some(
              (key) => normalizeKey(key) === normalizeKey(label.key),
            )
          : false;

        const imageSrc = getImageSrc(label.value);
        const isImage = imageSrc !== null;

        return (
          <div
            key={label.key}
            className={`py-2.5 px-1 xs:col-end-13 ${
              isEven
                ? "lg:col-start-1 lg:col-end-6"
                : "lg:col-start-8 lg:col-end-13"
            }`}
          >
            {isImage ? (
              <div className="flex items-center justify-center">
                {label.key.toLowerCase().includes('signature') ? (
                  <img
                    src={imageSrc}
                    alt={label.key}
                    className="max-h-[60px] w-auto object-contain"
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt={label.key}
                    className="w-[100px] h-[100px] rounded-full border-2 border-gray-200 object-cover"
                  />
                )}
              </div>
            ) : (
              <>
                <p
                  id={convertToId(label.key)}
                  className="font-normal text-verySmallTextSize break-all text-[#666666] flex items-center gap-1"
                >
                  {convertToTitleCase(label.key)}
                  {isDisclosed && <SharableLink />}
                </p>
                <p
                  id={`${convertToId(label.key)}-value`}
                  className="font-bold text-smallTextSize break-all"
                >
                  {getDisplayValue(label.value)}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VcDetailsGrid;
