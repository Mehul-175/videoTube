/*
videoFile string
  thumbnail string
  owner objectID users
  title string
  description string
  duration number
  views number
  isPublished boolean
  createdAt date
  updatedAt date
*/

import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        }, 
        description: {
            type: String
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

const Video = mongoose.model("Video", videoSchema)
export default Video