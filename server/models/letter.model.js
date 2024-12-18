const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // Id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    closer_trf :{type: DataTypes.STRING(225) , allowNull: true},
ucc :{type: DataTypes.STRING(225) , allowNull: true},
kslucc :{type: DataTypes.STRING(225) , allowNull: true},
clname :{type: DataTypes.STRING(225) , allowNull: true},
locationid :{type: DataTypes.STRING(225) , allowNull: true},
ks_panno :{type: DataTypes.STRING(225) , allowNull: true},
dphldgval :{type: DataTypes.STRING(225) , allowNull: true},
ks_krasts :{type: DataTypes.STRING(225) , allowNull: true},
ks_pttsts :{type: DataTypes.STRING(225) , allowNull: true},
ks_kusts :{type: DataTypes.STRING(225) , allowNull: true},
ks_emailid :{type: DataTypes.STRING(225) , allowNull: true},
ks_mobile :{type: DataTypes.STRING(225) , allowNull: true},
ks_dprtcd :{type: DataTypes.STRING(225) , allowNull: true},
ks_dpid :{type: DataTypes.STRING(225) , allowNull: true},
ksdp_boid :{type: DataTypes.STRING(225) , allowNull: true},
bnkacno :{type: DataTypes.STRING(225) , allowNull: true},
ifsc_cd :{type: DataTypes.STRING(225) , allowNull: true},
bnknm :{type: DataTypes.STRING(225) , allowNull: true},
vir_ifsc :{type: DataTypes.STRING(225) , allowNull: true},
vir_bkacno :{type: DataTypes.STRING(225) , allowNull: true},
vir_bknm :{type: DataTypes.STRING(225) , allowNull: true},
ks_sohval :{type: DataTypes.STRING(225) , allowNull: true},
ks_nomn :{type: DataTypes.STRING(225) , allowNull: true},
ks_relwapc :{type: DataTypes.STRING(225) , allowNull: true},
ks_nompan :{type: DataTypes.STRING(225) , allowNull: true},
ks_nomshr :{type: DataTypes.STRING(225) , allowNull: true},
ems_ddt :{type: DataTypes.STRING(225) , allowNull: true},
nod_dormnt :{type: DataTypes.STRING(225) , allowNull: true},
priority :{type: DataTypes.STRING(225) , allowNull: true},
es_catg :{type: DataTypes.STRING(225) , allowNull: true},
ks_clsts :{type: DataTypes.STRING(225) , allowNull: true},
kyc_stsdt :{type: DataTypes.STRING(225) , allowNull: true},
kyc_sts :{type: DataTypes.STRING(225) , allowNull: true},
kyc_fnlsts :{type: DataTypes.STRING(225) , allowNull: true},
ks_krptrem :{type: DataTypes.STRING(225) , allowNull: true},
auth_pnm :{type: DataTypes.STRING(225) , allowNull: true},
auth_preln :{type: DataTypes.STRING(225) , allowNull: true},
ks_dpsoh :{type: DataTypes.STRING(225) , allowNull: true},
estovr :{type: DataTypes.STRING(225) , allowNull: true},
esnetbkg :{type: DataTypes.STRING(225) , allowNull: true},
eslsttrd :{type: DataTypes.STRING(225) , allowNull: true},
ks_introdt :{type: DataTypes.STRING(225) , allowNull: true},
ks_lstrdt :{type: DataTypes.STRING(225) , allowNull: true},
ks_krarem :{type: DataTypes.STRING(225) , allowNull: true},
ks_emsent :{type: DataTypes.STRING(225) , allowNull: true},
ks_emrecd :{type: DataTypes.STRING(225) , allowNull: true},
ks_rm :{type: DataTypes.STRING(225) , allowNull: true},
cl_frboss :{type: DataTypes.STRING(225) , allowNull: true},
k_platform :{type: DataTypes.STRING(225) , allowNull: true},
ks_mtfcl :{type: DataTypes.STRING(225) , allowNull: true},
ks_nsecm :{type: DataTypes.STRING(225) , allowNull: true},
ks_bsecm :{type: DataTypes.STRING(225) , allowNull: true},
ks_nsefo :{type: DataTypes.STRING(225) , allowNull: true},
ks_nsecds :{type: DataTypes.STRING(225) , allowNull: true},
ks_mcx :{type: DataTypes.STRING(225) , allowNull: true},
ks_ncdex :{type: DataTypes.STRING(225) , allowNull: true},
es_email :{type: DataTypes.STRING(225) , allowNull: true},
es_mobile :{type: DataTypes.STRING(225) , allowNull: true},
es_dobdoi :{type: DataTypes.STRING(225) , allowNull: true},
es_uid :{type: DataTypes.STRING(225) , allowNull: true},
ks_cltype :{type: DataTypes.STRING(225) , allowNull: true},
ks_clusrid :{type: DataTypes.STRING(225) , allowNull: true},
kral_fno :{type: DataTypes.STRING(225) , allowNull: true},
kral_ncm :{type: DataTypes.STRING(225) , allowNull: true},
ks_frccode :{type: DataTypes.STRING(225) , allowNull: true},
ks_frchis :{type: DataTypes.STRING(225) , allowNull: true},
mis_state :{type: DataTypes.STRING(225) , allowNull: true},
deal_zone :{type: DataTypes.STRING(225) , allowNull: true},
es_ckyc :{type: DataTypes.STRING(225) , allowNull: true},
es_nomn :{type: DataTypes.STRING(225) , allowNull: true},
es_nompan :{type: DataTypes.STRING(225) , allowNull: true},
es_nomshr :{type: DataTypes.STRING(225) , allowNull: true},
es_relwapc :{type: DataTypes.STRING(225) , allowNull: true},
es_locncd :{type: DataTypes.STRING(225) , allowNull: true},
es_locnid :{type: DataTypes.STRING(225) , allowNull: true},
neoid :{type: DataTypes.STRING(225) , allowNull: true},
odinid :{type: DataTypes.STRING(225) , allowNull: true},
bossid :{type: DataTypes.STRING(225) , allowNull: true},
ensecm :{type: DataTypes.STRING(225) , allowNull: true},
ensefo :{type: DataTypes.STRING(225) , allowNull: true},
ensecds :{type: DataTypes.STRING(225) , allowNull: true},
ebsecm :{type: DataTypes.STRING(225) , allowNull: true},
emcx :{type: DataTypes.STRING(225) , allowNull: true},
encdex :{type: DataTypes.STRING(225) , allowNull: true},
ecl_sts :{type: DataTypes.STRING(225) , allowNull: true},
coradd1 :{type: DataTypes.STRING(225) , allowNull: true},
coradd2 :{type: DataTypes.STRING(225) , allowNull: true},
coradd3 :{type: DataTypes.STRING(225) , allowNull: true},
coradd4 :{type: DataTypes.STRING(225) , allowNull: true},
corcity :{type: DataTypes.STRING(225) , allowNull: true},
corstate :{type: DataTypes.STRING(225) , allowNull: true},
corpin :{type: DataTypes.STRING(225) , allowNull: true},
corcntry :{type: DataTypes.STRING(225) , allowNull: true},
per_add1 :{type: DataTypes.STRING(225) , allowNull: true},
per_add2 :{type: DataTypes.STRING(225) , allowNull: true},
per_add3 :{type: DataTypes.STRING(225) , allowNull: true},
per_add4 :{type: DataTypes.STRING(225) , allowNull: true},
per_city :{type: DataTypes.STRING(225) , allowNull: true},
per_state :{type: DataTypes.STRING(225) , allowNull: true},
per_pin :{type: DataTypes.STRING(225) , allowNull: true},
per_cntry :{type: DataTypes.STRING(225) , allowNull: true},
barcode :{type: DataTypes.STRING(225) , allowNull: true},
brcd :{type: DataTypes.STRING(225) , allowNull: true},
brname :{type: DataTypes.STRING(225) , allowNull: true},
family_grp :{type: DataTypes.STRING(225) , allowNull: true},
es_fahugu :{type: DataTypes.STRING(225) , allowNull: true},
es_dprtcd :{type: DataTypes.STRING(225) , allowNull: true},
es_dpledg :{type: DataTypes.STRING(225) , allowNull: true},
es_ledbal :{type: DataTypes.STRING(225) , allowNull: true},
es_margin :{type: DataTypes.STRING(225) , allowNull: true},
opnpos_nfo :{type: DataTypes.STRING(225) , allowNull: true},
run_date :{type: DataTypes.STRING(225) , allowNull: true},




        ksl_rela :{type: DataTypes.STRING(225) , allowNull: true},
        ksl_status :{type: DataTypes.STRING(225) , allowNull: true},
        ksl_date :{type: DataTypes.STRING(225) , allowNull: true},
        kslstatus :{type: DataTypes.STRING(225) , allowNull: true},
        ksl_remk :{type: DataTypes.STRING(225) , allowNull: true},



        status :{type: DataTypes.STRING(225) , allowNull: true},
        updstatus :{type: DataTypes.STRING(225) , allowNull: true},
        statusdate :{type: DataTypes.STRING(225) , allowNull: true},
        updstatusdate :{type: DataTypes.STRING(225) , allowNull: true},



        date :{type: DataTypes.STRING(225) , allowNull: true},
describe :{type: DataTypes.STRING(225) , allowNull: true},
result :{type: DataTypes.STRING(225) , allowNull: true},



    
 
    
    // id: {type: DataTypes.INTEGER, allowNull: true , primaryKey: true,}
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("letter", attributes, options);
}
