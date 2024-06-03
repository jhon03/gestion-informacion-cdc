import { Programa } from '../../../domain/entities/programa.model';
import { ProgramaRepository } from '../../../domain/repositories/programa.repository';
import { getMongoClient } from '../../database/mongodb/mongo.config';
import { ObjectId } from 'mongodb';

export class ProgramaMongoRepository implements ProgramaRepository {
    async getAll(): Promise<Programa[]> {
        const client = await getMongoClient();
        const db = client.db('gestion_informacion');
        const programas = await db.collection('programas').find().toArray();
        client.close();
        return programas.map(programa => new Programa(
            programa._id.toString(), 
            
           
        ));
    }


  
}
