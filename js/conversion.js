//let girl;
//let woman;
//let slut;
//let bitch;
//let chick;
//let whore;
//let skank;


let stats = d3.csv("data/xHamster.csv", function (data) {
    
    let girl = data.filter((match) => {
        return /.*girl.*/.test(match.description, match.title);
    });
    
    let man = data.filter((match) => {
        return /(([:space:])|\W)(man|men)(([:space:])|\W)/.test(match.description, match.title);
    });

    console.log(stats, girl, man);
});


//let girl = data.filter((match) => {
//        return /.*girl.*/.test(match.description, match.title);
//    });
////
//    
//    let  woman = data.filter((match)=>{
//        return /.*woma?e?n.*/.test(match.title, match.description); 
//    });
//    
//    let slut = data.filter((match)=>{
//        return /.*slut.*/.test(match.title, match.description); 
//    });
//        
//    let bitch = data.filter((match)=>{
//        return /.*bitch.*/.test(match.title, match.description); 
//    });
//        
//    let chick = data.filter((match)=>{
//        return /.*chick*/.test(match.title, match.description); 
//    });
//        
//    let whore = data.filter((match)=>{
//        return /.*whore.*/.test(match.title, match.description); 
//    });
//    
//    let skank = data.filter((match)=>{
//        return /.*skank.*/.test(match.title, match.description); 
//    });
//    
//      let babe = data.filter((match)=>{
//        return /.*babe.*/.test(match.title, match.description); 
//    });
//    
//      let blonde = data.filter((match)=>{
//        return /.*blonde.*/.test(match.title, match.description); 
//    });
//    
//      let brunette = data.filter((match)=>{
//        return /.*brunette.*/.test(match.title, match.description); 
//    });
//    
//      let teen = data.filter((match)=>{
//        return /.*teen.*/.test(match.title, match.description); 
//    });
//    
//      let school = data.filter((match)=>{
//        return /.*school[:space:]?girl.*/.test(match.title, match.description); 
//    });
//    
//     let babysitter = data.filter((match)=>{
//        return /.*baby[:space:]?sitter.*/.test(match.title, match.description); 
//    });
//    
//      let redHead = data.filter((match)=>{
//        return /.*red[:space:]?head.*/.test(match.title, match.description); 
//    });
//    
//    console.log("Girl," + girl.length);
//    
//     console.log("Woman," + woman.length);
//    
//    console.log("Whore," + whore.length);
//    
//    console.log("Bitch," + bitch.length);
//    
//    console.log("Chick," + chick.length);
//    
//    console.log("Slut," + slut.length);
//    
//    console.log("Skank," + skank.length);
//    
//    console.log("Babe," + babe.length);
//    
//    console.log("Blonde," + blonde.length);
//    
//    console.log("Brunette,"+ brunette.length);
//    
//    console.log("Red head," + redHead.length);
//    
//    console.log("Teen," + teen.length);
//    
//    console.log("Schoolgirl," + school.length);
//    
//    console.log("Babysitter," + babysitter.length);



//    
// let man = data.filter((match) => {
//        return /.*ma?e?n.*/.test(match.description, match.title);
//    });
//    
//     let guy = data.filter((match) => {
//        return /.*guy.*/.test(match.description, match.title);
//    });
//    
//     let dude = data.filter((match) => {
//        return /.*dude.*/.test(match.description, match.title);
//    });
//    
//     let hung = data.filter((match) => {
//        return /.*hung.*/.test(match.description, match.title);
//    });
//    
//    let daddy = data.filter((match) => {
//        return /.*dadd?y?.*/.test(match.description, match.title);
//    });
//    
//    let bbc = data.filter((match) => {
//        return /.*bbc.*/.test(match.description, match.title);
//    });
//    
//    let muscle = data.filter((match) => {
//        return /.*muscle.*/.test(match.description, match.title);
//    });
//    
//    let boy = data.filter((match) => {
//        return /.*boy.*/.test(match.description, match.title);
//    });
//    
//    
//    
//    console.log("Boy," + boy.length);
//    console.log("Man," + man.length);
//    console.log("Muscle," + muscle.length);
//    console.log("BBC," + bbc.length);
//    console.log("Daddy," + daddy.length);
//    console.log("Hung," + hung.length);
//    console.log("Dude," + dude.length);
//    console.log("Guy," + guy.length);


//
//let tits=  data.filter((match)=>{
//        return /.*tits.*/.test(match.title, match.description); 
//    });
//let pussy = data.filter((match)=>{
//        return /.*pussy.*/.test(match.title, match.description); 
//    });
//let cunt = data.filter((match)=>{
//        return /.*cunt.*/.test(match.title, match.description); 
//    });
//let boobs = data.filter((match)=>{
//        return /.*boobs.*/.test(match.title, match.description); 
//    });
//let breasts = data.filter((match)=>{
//        return /.*breasts.*/.test(match.title, match.description); 
//    });
//let clit = data.filter((match)=>{
//        return /.*clit.*/.test(match.title, match.description); 
//    });
//let vagina = data.filter((match)=>{
//        return /.*vagina.*/.test(match.title, match.description); 
//    });
//let clitoris = data.filter((match)=>{
//        return /.*clitoris.*/.test(match.title, match.description); 
//    });
//
//
//console.log("Tits, " + tits.length, "Pussy, "+ pussy.length, "Cunt, " + cunt.length, "Boobs, "+ boobs.length, "Breasts, "+ breasts.length, "Clit, " + clit.length, "Vagina, " + vagina.length, "Clitoris, " + clitoris.length);

// let dick = data.filter((match) => {
//        return /.*dick.*/.test(match.description, match.title);
//    });
//    
//     let penis = data.filter((match) => {
//        return /.*penis.*/.test(match.description, match.title);
//    });
//    
//     let balls = data.filter((match) => {
//        return /.*balls.*/.test(match.description, match.title);
//    });
//    
//     let taint = data.filter((match) => {
//        return /.*taint.*/.test(match.description, match.title);
//    });
//    
//    let cock = data.filter((match) => {
//        return /.*cock.*/.test(match.description, match.title);
//    });
//    
//    
//    console.log("Dick," + dick.length, "Penis," + penis.length, "Balls," + balls.length, "Taint," + taint.length, "Cock," + cock.length);

//
//let Upskirt   = data.filter((match) => {
//        return /.*up[:space:]?skirt.*/.test(match.description, match.title);
//    });
//    
//let Used   = data.filter((match) => {
//        return /\bused?\b/.test(match.description, match.title);
//    });
//let Rough = data.filter((match) => {
//        return /\brough\b/.test(match.description, match.title);
//    });
//let Surprise = data.filter((match) => {
//        return /.*surprised?.*/.test(match.description, match.title);
//    });
//let Coerce  = data.filter((match) => {
//        return /.*coerced?.*/.test(match.description, match.title);
//    });
//let Accosted = data.filter((match) => {
//        return /.*accoste?d?.*/.test(match.description, match.title);
//    });
//let Manipulated = data.filter((match) => {
//        return /.*manipulated?.*/.test(match.description, match.title);
//    });
//let Revenge = data.filter((match) => {
//        return /.*revenge.*/.test(match.description, match.title);
//    });
//let Hardcore  = data.filter((match) => {
//        return /.*hard[:space:]?core.*/.test(match.description, match.title);
//    });
//let Seduced = data.filter((match) => {
//        return /.*seduced?.*/.test(match.description, match.title);
//    });
//let Tricked = data.filter((match) => {
//        return /\btricke?d?\b/.test(match.description, match.title);
//    });
//let Raped = data.filter((match) => {
//        return /\braped?\b/.test(match.description, match.title);
//    });
//let Forced = data.filter((match) => {
//        return /\bforced?\b/.test(match.description, match.title);
//    });
//
//console.log("Forced," + Forced.length, "Raped," + Raped.length, "Tricked," + Tricked.length, "Seduced," + Seduced.length, "Hardcore," + Hardcore.length, "Revenge," + Revenge.length, "Manipulated," + Manipulated.length, "Accosted," + Accosted.length, "Coerced," + Coerce.length, "Surprise," + Surprise.length, "Rough," + Rough.length, "Used," + Used.length, "Upskirt," + Upskirt.length); 
//    
//    console.log(Tricked);
//    console.log(Seduced);
//    console.log(Hardcore);
//    console.log(Revenge);
//    console.log(Manipulated);
//    console.log(Accosted);
//    console.log(Coerce);
//    console.log(Surprise);
//    console.log(Rough);
//    console.log(Used);
//    console.log(Upskirt);


//let brutal = data.filter((match) => {
//        return /.*brutal.*/.test(match.description, match.title);
//    });
//    let gangbang = data.filter((match) => {
//        return /.*gang[:space:]?bang.*/.test(match.description, match.title);
//    });
//    let re = data.filter((match) => {
//        return /\br\W\We\b.*/.test(match.description, match.title);
//    });
//    let exploited = data.filter((match) => {
//        return /.*exploite?d?.*/.test(match.description, match.title);
//    });
//    let caught = data.filter((match) => {
//        return /.*caught.*/.test(match.description, match.title);
//    });
//    let shame = data.filter((match) => {
//        return /.*shame.*/.test(match.description, match.title);
//    });
//    let takeAdvantage = data.filter((match) => {
//        return /.*take[:space:]?advantage.*/.test(match.description, match.title);
//    });
//    let hiddenCam = data.filter((match) => {
//        return /.*hidden[:space:]?cam.*/.test(match.description, match.title);
//    });
//    let gullible = data.filter((match) => {
//        return /.*gullible.*/.test(match.description, match.title);
//    });
//    let naive = data.filter((match) => {
//        return /.*naive.*/.test(match.description, match.title);
//    });
//
//    console.log("Brutal," + brutal.length, "Gangbang," + gangbang.length, "R--e," +
//        re.length, "Exploited," + exploited.length, "Caught," + caught.length, "Shame," + shame.length, "Take Advantage," + takeAdvantage.length, "Hidden Cam," + hiddenCam.length, "Gullible," + gullible.length, "Naive," + naive.length);
//    
//    console.log(brutal);
//    console.log(gangbang)
//    console.log(re);
//    console.log(exploited);
//    console.log(caught);
//    console.log(shame);
//    console.log(takeAdvantage);
//    console.log(hiddenCam);
//    console.log(gullible);
//    console.log(naive);
