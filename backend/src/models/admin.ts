import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
    AdminID: string;
    password: string;
    createdBy: IAdmin | null;
    _id: string;
}

const AdminSchema = new Schema<IAdmin>({
    AdminID: { type: String, required: true },
    password: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' }
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
export type { IAdmin };
