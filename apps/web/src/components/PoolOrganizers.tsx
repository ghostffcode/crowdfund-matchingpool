import { Address } from "wagmi";
import { Organizer } from "~/types";
import { EnsAvatar } from "./EnsAvatar";
import { EnsName } from "./EnsName";

type Props = { organizers: Organizer[] };

export const Organizers = ({ organizers = [] }: Props) => {
  return (
    <section>
      <h4 className="mb-6 text-center text-xl font-bold">Organized by</h4>
      <div className="flex justify-center">
        <div className="flex gap-10 overflow-x-auto">
          {organizers.map((org) => (
            <div
              key={org.address}
              className="group flex flex-col items-center justify-center"
            >
              <EnsAvatar
                address={org.address as Address}
                className="mb-1"
                color="gray"
                size="md"
              />
              <div className="text-lg font-bold">
                <EnsName address={org.address as Address} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
