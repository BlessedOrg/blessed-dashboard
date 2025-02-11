import { Loader2 } from "lucide-react";

export const FixedLoading = ({
	sectionLoading,
}: {
	sectionLoading?: boolean
}) => {

	if(sectionLoading) {
		return <div className="flex rounded-2xl w-full h-[40rem] items-center justify-center bg-gray-100 z-40">
			<Loader2 className="w-8 h-8 animate-spin text-primary" />
		</div>
	}

	return <div className="flex fixed top-0 left-0 items-center justify-center min-h-screen w-full bg-gray-100 z-40">
		<Loader2 className="w-8 h-8 animate-spin text-primary" />
	</div>
}