import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";

export const ContributeButton = ({ address = "" }) => {
  // Where do we get this data?
  const organization = "metacrisis.xyz";

  /* TODO: hooks for ERC20
    - useAllowance()
    - useApprove()
    - useTransfer()
    - form + validation
    - approve()
    - transfer()
  */
  const isLoading = false;
  return (
    <div>
      <Dialog
        title={`Donate to ${organization}`}
        trigger={
          <Button color="primary" size="lg" className="w-full">
            Contribute now
          </Button>
        }
      >
        <div className="p-8" style={{ width: 500 }}>
          <div className="mb-8">
            <div className="mb-2 flex bg-gray-200">
              <input
                placeholder="0"
                className="block w-full bg-transparent p-4 text-xl outline-none"
              />
              <div className="flex items-center justify-center px-4 text-xl text-gray-400">
                USDC
              </div>
            </div>
            <div className="text-right">Balance: 100 USDC</div>
          </div>
          <Button disabled={isLoading} className="w-full" color="primary">
            {isLoading ? "Approving..." : "Approve"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
