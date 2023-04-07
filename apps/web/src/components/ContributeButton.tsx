import { Button } from "./ui/Button";

export const ContributeButton = ({ address = "" }) => (
  <Button
    color="primary"
    size="lg"
    onClick={() => alert("not implemented")}
    className="w-full"
  >
    Contribute now
  </Button>
);
