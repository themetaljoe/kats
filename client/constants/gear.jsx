function BrandFactory(name, logoPath) {
  return { name, logoPath };
}

export const GearBrandMap = {
  'PEDALS & EFFECTS': [
    BrandFactory('Wampler', 'http://cdn2.bigcommerce.com/server3100/y88g1p/product_images/uploaded_images/logo-white-on-black.jpg?t=1439947293'),
    BrandFactory('Electro-Harmonix', 'https://www.ehx.com/images/blog/electro-harmonix.png'),
    BrandFactory('Behringer', 'https://static1.squarespace.com/static/51a1a217e4b0660e99ad7be8/58338fc62e69cf204644657e/58338fd49de4bb598d192bb7/1479774811866/behringer-logo.png'),
    BrandFactory('MXR/Dunlop', 'https://donstickguitar.files.wordpress.com/2015/08/mxr-dunlop.jpg?w=626&h=313'),
    BrandFactory('TC Electronic', 'http://www.tcelectronic.com/media/2705449/tc-electronic-logo-918x123.png'),
    BrandFactory('Carl Martin', 'http://www.musikkhandel.no/media/amshopby/medium111.jpg'),
    BrandFactory('Line 6', 'http://www.guitar-planet.co.uk/wp-content/uploads/2016/10/logo-Line6.png'),
    BrandFactory('Xotic Effects', 'http://xotic.us/skin/frontend/boilerplate_info/default/images/logo.png'),
    BrandFactory('Keeley', 'http://willcuttguitars.com/images/pedallogos/Keeley.jpg'),
    BrandFactory('Tortuga Effects', 'https://soundnations.com/wp-content/uploads/2015/09/Logo-in-black-background.jpg'),
    BrandFactory('Boss', 'http://www.revolutionmusic.com.au/product_images/uploaded_images/boss-logo.gif'),
    BrandFactory('Pigtronix', 'https://thepedalfile.files.wordpress.com/2015/01/pigtronixlogo.png'),
    BrandFactory('Tech 21', 'http://www.tech21nyc.com/images/t21logo_head.jpg'),
    BrandFactory('JHS Pedals', 'https://www.jhspedals.com/wp-content/uploads/2012/02/jhs-logo.png'),
    BrandFactory('Way Huge', 'http://c3.zzounds.com/media/fit,235by141/way_huge-1598c8cbde73b42db8c536e84759310a.png'),
    BrandFactory('EWS', 'https://image.rakuten.co.jp/centralmusic/cabinet/04473457/imgrc0085559538.jpg'),
    BrandFactory('Pro Co Rat', 'http://ratdistortion.com/Skins/RatDistortion/Images/multistore/multisite-rat.png'),
    BrandFactory('Mooer', 'http://www.ellaways.com.au/media/wysiwyg/logos_med/Mooer_Logo.jpg'),
    BrandFactory('Digitech', 'https://cdn.worldvectorlogo.com/logos/digitech.svg'),
    BrandFactory('Amptweaker *', 'https://musicpage.s3.amazonaws.com/uploads/groups/group_photo/photo/5076fac9eedc1e0002000062/cropped_amptweaker_logo.jpg'),
    BrandFactory('AMT *', 'http://amtelectronics.com/new/wp-content/uploads/2015/06/logo-amt.png'),
    BrandFactory('Strymon *', 'http://www.strymon.net/wp-content/uploads/2016/01/strymon_logo.png'),
    BrandFactory('MXR Custom *', 'https://donstickguitar.files.wordpress.com/2015/08/mxr-dunlop.jpg?w=626&h=313'),
    BrandFactory('Seymour Duncan *', 'http://www.seymourduncan.com/wp-content/uploads/2016/02/sd_logo_primary_1black.jpg'),
  ],

  'AMPLIFIERS': [
    BrandFactory('Krank', 'http://www.reamp-studio.com/wp-content/uploads/2015/10/KNKlogoGREEN.png'),
    BrandFactory('Blackstar', 'https://www.blackstaramps.com/img/master/logo-dark.png'),
    BrandFactory('Marshall', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Marshall_logo.svg/1280px-Marshall_logo.svg.png'),
    BrandFactory('Line 6', 'http://www.guitar-planet.co.uk/wp-content/uploads/2016/10/logo-Line6.png'),
    BrandFactory('Roland', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Roland_logo.svg/2000px-Roland_logo.svg.png'),
    BrandFactory('Behringer', 'https://static1.squarespace.com/static/51a1a217e4b0660e99ad7be8/58338fc62e69cf204644657e/58338fd49de4bb598d192bb7/1479774811866/behringer-logo.png'),
    BrandFactory('Orange', 'https://orangeamps.com/wp-content/uploads/2014/11/Orange-logo.png'),
    BrandFactory('EVH', 'http://evhgeardiscussion.com/wp-content/uploads/2014/08/barnds-evh.png'),
    BrandFactory('Peavey', 'https://seeklogo.com/images/P/Peavey-logo-AEA354CA51-seeklogo.com.png'),
  ],
  'PICKUPS': [
    BrandFactory('Fender', 'https://seeklogo.com/images/F/Fender-logo-1FDA71BA74-seeklogo.com.png'),
    BrandFactory('Gibson', 'http://files.soundstorejapan.com/200000051-3979e3a748/59%20Gibson%20Logo.jpg'),
    BrandFactory('Rio Grande', 'http://2ap6ndle7dn3hxy4u3p0d587.wpengine.netdna-cdn.com/wp-content/uploads/2011/03/riograndedec07.jpg'),
    BrandFactory('EMG', 'https://upload.wikimedia.org/wikipedia/en/1/14/EMG_logo.png'),
    BrandFactory('TV Jones', 'http://static.no1-guitars.de/uploads/2012/09/TVJones_logo_inst.png'),
    BrandFactory('Lace', 'http://www.lacemusic.com/img/lace_logo_RW.png'),
    BrandFactory('DiMarzio', 'http://lghttp.54936.nexcesscdn.net/8033D67/magento/media/wysiwyg/MfgLogo/DiMarzioLogo.jpg'),
    BrandFactory('PRS', 'https://cdn3.bigcommerce.com/s-qmkmkpbc/product_images/uploaded_images/prs-logo-vector-black.jpg?t=1475858326'),
    BrandFactory('EVH', 'http://evhgeardiscussion.com/wp-content/uploads/2014/08/barnds-evh.png'),
    BrandFactory('Seymour Duncan', 'http://www.seymourduncan.com/wp-content/uploads/2016/02/sd_logo_primary_1black.jpg'),
  ],
  'TUBES': [
    BrandFactory('Mullard', 'https://i0.wp.com/bobsshack.co.uk/wp-content/uploads/2014/07/mullard.png?fit=525%2C300&w=640'),
    BrandFactory('JJ', 'https://www.freebytes.com/catalog/images/JJ-Logo-180.gif'),
    BrandFactory('Sovtek', 'http://images-nitrosell-com.akamaized.net/public_html/12/2789/themes/brand_logos/Sovtek_logo.jpg'),
    BrandFactory('Tung Sol', 'http://www.srs-webstore.com/images/tunglogo.jpg'),
    BrandFactory('Winged “C”', 'https://www.wingedc.com/images/wingedc.png'),
    BrandFactory('Electro-Harmonix', 'https://www.ehx.com/images/blog/electro-harmonix.png'),
  ],
  'STAGE & LIGHTING': [
    BrandFactory('MBT', 'http://www.mbtlighting.com/img/logo.gif'),
    BrandFactory('American DJ', 'https://media.skylark.com.pl/producenci/american_dj-f80788ba9ce70da0928fde4d33c288b9.png'),
  ],
};
