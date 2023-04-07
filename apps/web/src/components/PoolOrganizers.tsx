import { Organizer } from "~/types";
import { Avatar } from "./ui/Avatar";

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
              className="group flex w-28 flex-col items-center justify-center"
            >
              <Avatar className="mb-1" color="gray" />
              <div className="text-lg font-bold">{org.address}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
