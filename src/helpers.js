import Base from './base';
import Moment from 'moment';

export function Nominate(nominees) {
    // Add nominee to Firebase DB
    const today = Moment().format('LL');
    const [first, last] = [nominees[nominees.length-1].First, nominees[nominees.length-1].Last];
    // Base.update(`nominees/${today}/${nominees.length-1}`, {
    //   data: {
    //       First: first,
    //       Last: last
    //   },
    //   then(err){
    //     if(!err){
    //       console.log(`Nominee added to database`);
    //     }
    //   }
    // });
}

export function Undo(nominees) {
    const today = Moment().format('LL');
    // Base.update(`nominees/${today}/${nominees.length-1}`, {
    //     data: {
    //       First: null,
    //       Last: null
    //   },
    //     then(err){
    //         if(!err){
    //             console.log(`Nominee removed to database`);
    //         }
    //     }
    // });
}

export function Add(person) {
    const [first, last, key] = [person.First, person.Last, person.key];
    // Base.update(`people/${key}`, {
    //     data: {
    //       First: first,
    //       Last: last
    //   },
    //     then(err){
    //         if(!err){
    //             console.log(`Added person to database`);
    //         }
    //     }
    // });
}

export function Win(winners) {
    // Add winner to Firebase DB
    const today = Moment().format('LL');
    const winner = winners[winners.length-1];
    const [first, last] = [winner.First, winner.Last];
    // Base.update(`winners/${today}/${winners.length-1}`, {
    //     data: {
    //         First: first,
    //         Last: last
    //     },
    //     then(err){
    //         if(!err){
    //         console.log(`Winner added to database`);
    //         }
    //     }
    // });
}