import Intro from "../models/Intro";
import User from "../models/User";
import Music from "../models/Music";
import Opportunity from "../models/Opportunity";
import Hub from "../models/Hub";
// hash_256 ref: https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd
const searchTypes = ['Musics','Artists','Opportunities'];  
    const style =           ['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday','Retro','Lounge',
                            'Blues','Soul &RnB','Funk', 'Latin','Country','Acoustic','Indie','Rap','Classical','Heavy Metal']
    const instrument =      ['Synth','Drums','Percussion','Guitar','Bass','KeyBoard','Vocals','Piano', 
                            'String','Woodwinds','Brass','Saxophone','Harmonica','BeatBox']
    const jobType =         ['Full Time', 'Part Time', 'Freelance', 'Intern']
    const jobSpecification= ['No Experience Required', 'No Degree Required', 'Work Online', 'Work From Home', 'Verified']
    const jobOccupation =   ['Music Producer','Recording Engineer', 'Session Musician',
                            'Artist Manager', 'Tour Manager', 'Music Teacher', 'Booking Agent', 'Music Publicist', 'Composer', 'Music Arranger',
                            'Accompanist', 'Background Singer', 'Band Director', 'Choir Director', 'Conductor', 'Cover Band', 'DJ', 'Drummer']
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

export default async()=>{
    await Intro.deleteMany({})
    await User.deleteMany({})
    await Music.deleteMany({})
    await Opportunity.deleteMany({})
    await Hub.deleteMany({})
    
    let new_user=new User({ 
        id:0,user_name:'Sergei Rachmaninoff',
        password: hash("password"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Piano','Classical'],
        intros:[

        "# Intro\
        **Sergei Vasilyevich Rachmaninoff** (1 April 1873 – 28 March 1943) was :\
        * a Russian composer\
        * a virtuoso pianist\
        * a conductor.\
        ",

        "## Accomplishments\
        Rachmaninoff is widely considered one of the finest pianists of his day and, as a composer, one of the last great representatives of Romanticism in Russian classical music. Early influences of ==Tchaikovsky, Rimsky-Korsakov,== and other Russian composers gave way to a thoroughly personal idiom notable for its ***song-like melodicism, expressiveness and rich orchestral colours***.The piano is featured prominently in Rachmaninoff's compositional output and he made a point of using his skills as a performer to fully explore the expressive and technical possibilities of the instrument.\
        ",

        "## Quotes\
        > *Music is enough for a lifetime – but a lifetime is not enough for a music*\
        > I feel like a ghost wandering in a world grown alien\
        ",

        "## Career\
        Born into a musical family, Rachmaninoff took up the piano at the age of four. He studied with ==Anton Arensky and Sergei Taneyev== at the *Moscow Conservatory* and graduated in 1892, having already composed several piano and orchestral pieces. In 1897, following the disastrous premiere of his Symphony No. 1, Rachmaninoff entered a four-year depression and composed little until successful supportive therapy allowed him to complete his enthusiastically received Piano Concerto No. 2 in 1901. In the course of the next sixteen years, Rachmaninoff conducted at the Bolshoi Theatre, relocated to Dresden, Germany, and toured the United States for the first time.\
        "



        ],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:1894,
                user_cv_event:"Russian Tour",
                user_cv_note:"To earn more money, Rachmaninoff returned to giving piano lessons—which he hated—and in late 1895, agreed to a three-month tour across Russia with a program shared by Italian violinist Teresina Tua. The tour was not enjoyable for the composer and he quit before it ended, thus sacrificing his performance fees. In a more desperate plea for money, Rachmaninoff pawned his gold watch given to him by Zverev."
            },
            {
                user_cv_time:1914,
                user_cv_event:"Concert Tour of England",
                user_cv_note:"In January 1914, Rachmaninoff began a concert tour of England which was enthusiastically receive. He was too afraid to travel alone following the death of Raoul Pugno of an unexpected heart attack in his hotel room which left the composer wary of a similar fate."
            },
            {
                user_cv_time:1917,
                user_cv_event:"Piano Recital Aid",
                user_cv_note:"On the day the February 1917 Revolution began in Saint Petersburg, Rachmaninoff performed a piano recital in Moscow in aid of wounded Russian soldiers who had fought in the war. He returned to Ivanovka two months later, finding it in chaos after a group of Social Revolutionary Party members seized it as their own communal property. Despite having invested most of his earnings on the estate, Rachmaninoff left the property after three weeks, vowing never to return."
            }
        ],
        user_contact : {
            user_contact_email: "Rachmaninoff@Sergei.com",
            user_contact_phone: "+1234567890",
            user_contact_address: "Kensico Cemetery, New York, United States",
            user_contact_links:{
                ig_link: null,
                yt_link: "https://www.youtube.com/watch?v=rEGOihjqO9w",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_user_2=new User({
        id:1,
        user_name:'abc',
        password: hash("a"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday'],
        intros:['content',"hi"],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:2022,
                user_cv_event:"a_event",
                user_cv_note:"a_note"
            }
        ],
        user_contact : {
            user_contact_email: "abc@abc.com",
            user_contact_phone: "+442098765750",
            user_contact_address: "middle east",
            user_contact_links:{
                ig_link: "https://www.instagram.com/coldplay/?hl=en",
                yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_user_3=new User({
        id:2,
        user_name:'b',
        password: hash("b"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday'],
        intros:["Hi"],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:2022,
                user_cv_event:"test",
                user_cv_note:"test"
            }
        ],
        user_contact : {
            user_contact_email: "sponge@sponge.com",
            user_contact_phone: "+442012348750",
            user_contact_address: "wheresome",
            user_contact_links:{
                ig_link: "https://www.instagram.com/coldplay/?hl=en",
                yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_user_4=new User({
        id:3,
        user_name:'sakaskucbx',
        password: hash("pineapple"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday'],
        intros:["Hi"],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:2022,
                user_cv_event:"test",
                user_cv_note:"test"
            }
        ],
        user_contact : {
            user_contact_email: "sponge@sponge.com",
            user_contact_phone: "+442012348750",
            user_contact_address: "wheresome",
            user_contact_links:{
                ig_link: "https://www.instagram.com/coldplay/?hl=en",
                yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_user_5=new User({
        id:4,
        user_name:'kbkujkjbj',
        password: hash("pineapple"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday'],
        intros:["Hi"],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:2022,
                user_cv_event:"test",
                user_cv_note:"test"
            }
        ],
        user_contact : {
            user_contact_email: "sponge@sponge.com",
            user_contact_phone: "+442012348750",
            user_contact_address: "wheresome",
            user_contact_links:{
                ig_link: "https://www.instagram.com/coldplay/?hl=en",
                yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_user_6=new User({
        id:5,
        user_name:'jugjgjg',
        password: hash("pineapple"),
        img_url: "https://i.imgur.com/L9gJdda.png",
        rating:0,
        tags:['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday'],
        intros:["Hi"],
        musics:[],
        opportunities:[],
        user_cv:[
            {
                user_cv_time:2022,
                user_cv_event:"test",
                user_cv_note:"test"
            }
        ],
        user_contact : {
            user_contact_email: "sponge@sponge.com",
            user_contact_phone: "+442012348750",
            user_contact_address: "wheresome",
            user_contact_links:{
                ig_link: "https://www.instagram.com/coldplay/?hl=en",
                yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
                tw_link: null,
                fb_link: null,
            }
        }
    })
    let new_hub=new Hub({
        id:0,
        hub_members:[new_user._id,new_user_3._id,new_user_2._id],
        hub_name:'test hub',
        hub_posts:[
            {
                post_user:new_user.id,
                post_time:2022121309,
                post_content:"hello everyone",
                comments:[
                    {
                        comment_user:new_user_2.id,//user id
                        comment_content:"asbsakbasj"
                    },
                    {
                        comment_user:new_user_3.id,//user id
                        comment_content:'ajdasjasjjsaas'
                    }
                ]


            }
        ]
    })
    new_user.user_hubs.push({
        accepted:false,
        hub:new_hub._id
    })
    new_user_3.user_hubs.push({
        accepted:true,
        hub:new_hub._id
    })
    new_user_2.user_hubs.push({
        accepted:true,
        hub:new_hub._id
    })
    /////////
    let new_hub_2=new Hub({
        id:1,
        hub_members:[new_user._id,new_user_5._id,new_user_6._id],
        hub_name:'test hub2',
        hub_posts:[
            {
                post_user:new_user.id,
                post_time:2022121309,
                post_content:"hello everyone",
                comments:[{
                    comment_user:new_user_5.id,//user id
                    comment_content:"asbsakbasj"
                },
                {
                    comment_user:new_user_6.id,//user id
                    comment_content:'ajdasjasjjsaas'
                }
                ]
            }
        ]
    })
    new_user.user_hubs.push({
        accepted:true,
        hub:new_hub_2._id
    })
    new_user_5.user_hubs.push({
        accepted:true,
        hub:new_hub_2._id
    })
    new_user_6.user_hubs.push({
        accepted:true,
        hub:new_hub_2._id
    })
    ///////////////////////
    let new_hub_3=new Hub({
        id:2,
        hub_members:[new_user_2._id,new_user_4._id,new_user_6._id],
        hub_name:'test hub2',
        hub_posts:[
            {
                post_user:new_user_4.id,
                post_time:2022121309,
                post_content:"hello everyone",
                comments:[{
                    comment_user:new_user_2.id,//user id
                    comment_content:"asbsakbasj"
                },
                {
                    comment_user:new_user_6.id,//user id
                    comment_content:'ajdasjasjjsaas'
                }
                ]
            }
        ]
    })
    new_user_2.user_hubs.push({
        accepted:true,
        hub:new_hub_3._id
    })
    new_user_4.user_hubs.push({
        accepted:true,
        hub:new_hub_3._id
    })
    new_user_6.user_hubs.push({
        accepted:true,
        hub:new_hub_3._id
    })
    //////////////////////////////
    let new_music= new Music({
        id:0,music_name:'test_music',rating:5,tags:['Electronic','Rock'],
        creators:[new_user._id,new_user_4._id],intros:['sdbscjsbsj'],year:2022,
        album:'test',
        link:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
    new_user.musics.push(new_music._id)
    new_user_4.musics.push(new_music._id)
    ///////////////////////
    let new_music_2= new Music({
        id:1,music_name:'test_music2',rating:5,tags:['Electronic','Rock'],
        creators:[new_user_2._id,new_user_3._id],intros:['asjgsajsa'],year:2022,
        album:'test',
        link:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
    new_user_2.musics.push(new_music_2._id)
    new_user_3.musics.push(new_music_2._id)
    //////////////////////////////
    let new_music_3= new Music({
        id:2,music_name:'test_music3',rating:5,tags:['Electronic','Rock'],
        creators:[new_user_2._id,new_user_3._id,new_user_5._id],intros:['asjgsajsa'],year:2022,
        album:'test',
        link:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
    new_user_2.musics.push(new_music_3._id)
    new_user_3.musics.push(new_music_3._id)
    new_user_5.musics.push(new_music_3._id)
    /////////////////////////////
    let new_music_4= new Music({
        id:3,music_name:'test_music4',rating:5,tags:['Electronic','Rock'],
        creators:[new_user_6._id,new_user_4._id,new_user_5._id],intros:['asjgsajsa'],year:2022,
        album:'test',
        link:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
    new_user_6.musics.push(new_music_4._id)
    new_user_4.musics.push(new_music_4._id)
    new_user_5.musics.push(new_music_4._id)
    //////////////////////////////////////////
    let new_opportunity= new Opportunity({id:0,user_opp_title:"test_opportunity",rating:5,
    tags:['Music Teacher','Composer'],providers:[new_user._id],user_opp_info:'test',user_opp_state:true})
    new_user.opportunities.push(new_opportunity._id)
    /////////////////////////////
    let new_opportunity_2= new Opportunity({id:1,user_opp_title:"test_opportunity2",rating:5,
    tags:['Music Teacher','Composer'],providers:[new_user_2._id,new_user_3._id],user_opp_info:'test',user_opp_state:true})
    new_user_2.opportunities.push(new_opportunity_2._id)
    new_user_3.opportunities.push(new_opportunity_2._id)
    //////////////////////////////////
    let new_opportunity_3= new Opportunity({id:2,user_opp_title:"test_opportunity3",rating:5,
    tags:['Music Teacher','Composer'],providers:[new_user_2._id,new_user_5._id],user_opp_info:'test',user_opp_state:true})
    new_user_2.opportunities.push(new_opportunity_3._id)
    new_user_5.opportunities.push(new_opportunity_3._id)
    ////////////////////////////////////
    let new_opportunity_4= new Opportunity({id:2,user_opp_title:"test_opportunity4",rating:5,
    tags:['Music Teacher','Composer'],providers:[new_user_4._id,new_user_5._id],user_opp_info:'test',user_opp_state:true})
    new_user_4.opportunities.push(new_opportunity_4._id)
    new_user_5.opportunities.push(new_opportunity_4._id)
    ////////////////////////////////




    await new_user.save()
    await new_user_2.save()
    await new_user_3.save()
    await new_user_4.save()
    await new_user_5.save()
    await new_user_6.save()

    await new_hub.save()
    await new_hub_2.save()
    await new_hub_3.save()

    await new_music.save()
    await new_music_2.save()
    await new_music_3.save()
    await new_music_4.save()

    await new_opportunity.save()
    await new_opportunity_2.save()
    await new_opportunity_3.save()
    await new_opportunity_4.save()

}