import { FC } from "react"
// import img from "../../../assets/image.png"
import ReviewStars from "@/components/ui/ReviewStars"
import { IReview } from "@/types/entities/Review"

interface ReviewItemProps {
  review: IReview;
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="flex flex-col gap-y-2 drop-shadow-md/40 bg-white p-5 rounded-md ">
        <div className="flex items-center gap-x-2">
            {/* <img src={img} alt="photo" className="h-full max-w-28 rounded-xl object-cover" /> */}
            <div className="flex flex-col h-full gap-y-2">
                <span className="text-base font-bold text-main-green h-12">{review.customerName}</span>
                <ReviewStars rating={review.value} />
                <p className="text-sm text-main-gray overflow-y-auto hide-scrollbar h-36">{review.content}</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewItem