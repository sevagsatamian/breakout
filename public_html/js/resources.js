game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
          {name: "tiles", type:"image", src: "data/img/tiles.png"},
          {name: "paddle", type:"image", src: "data/img/paddle.png"},
          {name: "brick", type:"image", src: "data/img/brick.png"},
          {name: "ball", type:"image", src: "data/img/ball.png"},
           {name: "solid-tile", type:"image", src: "data/img/solid-tile.png"},
        // *** App Academy ***
        // 
        // Add two graphics files, tiles and paddle, as a resource to use
        

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
         {name: "level01", type: "tmx", src: "data/map/level01.tmx"},
          {name: "level02", type: "tmx", src: "data/map/level02.tmx"},
           {name: "level03", type: "tmx", src: "data/map/level03.tmx"},
            {name: "level04", type: "tmx", src: "data/map/level04.tmx"},
             {name: "level05", type: "tmx", src: "data/map/level05.tmx"},
              {name: "level06", type: "tmx", src: "data/map/level06.tmx"},
              {name: "level07", type: "tmx", src: "data/map/level07.tmx"},
              {name: "level08", type: "tmx", src: "data/map/level08.tmx"},
              {name: "level09", type: "tmx", src: "data/map/level09.tmx"},
              {name: "level010", type: "tmx", src: "data/map/level010.tmx"},
               {name: "level011", type: "tmx", src: "data/map/level011.tmx"},
                {name: "level012", type: "tmx", src: "data/map/level012.tmx"},
        // *** App Academy ***
        // Add the level as a resource to use within the program


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
        {name: "paddle-sfx", type: "audio", src: "data/sfx/", channel: 2 }
];
