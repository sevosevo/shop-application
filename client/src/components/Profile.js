import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile, fetchProfileIfNeeded } from '../actions/profile';
import { warningTurnOff, warningTurnOn } from '../actions/warning';
import Warning from './Warning';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const EMPTY = 'Empty';

const Profile = ({ profile: {profile, loading}, getProfile, fetchProfileIfNeeded, warningTurnOff, warningTurnOn, warning }) => {

    const refreshProfile =  () => getProfile();

    useEffect( () =>  {

        fetchProfileIfNeeded();

    }, [fetchProfileIfNeeded] );
    console.log(profile);

    const p = profile || {};
    const checkInfo1 = {'dayphone': p.dayPhone, 'evephone': p.evePhone, 'mobilephone': p.mobPhone};
    const checkInfo2 = {'City': p.city, 'Address 1': p.address1, 'Address 2': p.address2, 'Region': p.region, 'Postal': p.postalCode, 'Country': p.country};

    return (
        <Fragment>
            {
                !loading && profile ? <Fragment>
                <table className="table my-3">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pwd (Hidden)</th>
                        <th scope="col">Dayphone</th>
                        <th scope="col">Evephone</th>
                        <th scope="col">Mobilephone</th>
                        <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{ profile.id }</th>
                            <td>{ profile.name }</td>
                            <td>{ profile.email }</td>
                            <td><i>Hidden</i></td>
                            <td>{ profile.dayPhone || EMPTY }</td>
                            <td>{ profile.evePhone || EMPTY}</td>
                            <td>{ profile.mobPhone || EMPTY }</td>
                            <td><button className="btn btn-success"><Link style={{textDecoration:'none', color: 'white'}} to="/profile/edit">Update</Link></button></td>
                            </tr>         
                        </tbody>
                </table>
                {
                    ((!profile.dayPhone || !profile.evePhone || !profile.mobPhone) && warning) && <Warning checkInfo={checkInfo1}/>            
                }
                <table className="table my-5">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">City</th>
                        <th scope="col">Address 1</th>
                        <th scope="col">Address 2</th>
                        <th scope="col">Region</th>
                        <th scope="col">Postal</th>
                        <th scope="col">Country</th>
                        <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                            <td>{ profile.city || EMPTY }</td>
                            <td>{ profile.address1 || EMPTY}</td>
                            <td>{ profile.address2 || EMPTY}</td>
                            <td>{ profile.region || EMPTY }</td>
                            <td>{ profile.postalCode || EMPTY }</td>
                            <td>{ profile.country || EMPTY }</td>
                            <td><button className="btn btn-success"><Link style={{textDecoration:'none', color: 'white'}} to="/profile/edit/address">Update</Link></button></td>
                            </tr>         
                        </tbody>
                     </table>
                    {
                        ((!profile.city || !profile.address1 || !profile.address2 || !profile.region || !profile.postalCode || !profile.country) && warning) && <Warning checkInfo={checkInfo2}/>            
                    }
                     <button className="btn btn-warning" onClick={ refreshProfile }>
                        Refresh profile page
                     </button>
                     {
                         !warning && <button className="btn btn-warning float-right" onClick={ warningTurnOn }>
                         Enable warnings
                      </button>
                     }
                     {
                         warning && <button className="btn btn-warning float-right" onClick={warningTurnOff}>Turn off warnings</button>
                     }
                </Fragment> : <Loading />
            }
        </Fragment>
    )
}
const mapStateToProps = state => ({
    profile: state.profile,
    warning: state.warning
});
const mapDispatchToProps = { getProfile, fetchProfileIfNeeded, warningTurnOff, warningTurnOn };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

