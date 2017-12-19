'use strict';
import { description, version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import fs from 'fs';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

  api.get('/generate/rt', (request, response) => {
    const params = [
      {
        slices: [
          {
            day: {replacementFiller: `'+slices[0].day+'`,placeholderString: /15TH/g,},
            week: {replacementFiller: `'+slices[0].week+'`,placeholderString: /Saturday/g,},
            month: {replacementFiller: `'+slices[0].month+'`,placeholderString: /JANUARY/g,},
            originAirport: {replacementFiller: `'+slices[0].originAirport+'`,placeholderString: /JFK/g,},
            departingAirport: {replacementFiller: `'+slices[0].departingAirport+'`,placeholderString: /SFO/g,},
          },
          {
            day: {replacementFiller: `'+slices[1].day+'`,placeholderString: /19TH/g,},
            week: {replacementFiller: `'+slices[1].week+'`,placeholderString: /Thursday/g,},
            month: {replacementFiller: `'+slices[1].month+'`,placeholderString: /FEBRUARY/g,},
            originAirport: {replacementFiller: `'+slices[1].originAirport+'`,placeholderString: /EWR/g,},
            departingAirport: {replacementFiller: `'+slices[1].departingAirport+'`,placeholderString: /LAX/g,},
          },
        ]
      },
      {tripNumber: {
        replacementFiller: "'+tripNumber+'",
        placeholderString: /XXX-XXX-XXX-XX/g,
      }},
    ];

    const fileNameAdjustment = 'rt';

    generateWaitAnimation(params, fileNameAdjustment, response);
    /*let content = '';
    fs.readFile(`${__dirname}/functionContent/head.txt`, 'utf8', (err, head) => {
      if (err) {
        return errorCallBack();
      }

      content += head;

      fs.readFile(`${__dirname}/animationFileRaw/instruction/flight-loader-bodymovin-rt.json`, 'utf8', (err, instruction) => {

        //SWITCHING TEXT TO VAR BEG
        console.log(instruction);
        let newInstruction=instruction;
        const params = [
          {
            slices: [
              {
                day: {replacementFiller: `'+slices[0].day+'`,placeholderString: /15TH/g,},
                week: {replacementFiller: `'+slices[0].week+'`,placeholderString: /Saturday/g,},
                month: {replacementFiller: `'+slices[0].month+'`,placeholderString: /JANUARY/g,},
                originAirport: {replacementFiller: `'+slices[0].originAirport+'`,placeholderString: /JFK/g,},
                departingAirport: {replacementFiller: `'+slices[0].departingAirport+'`,placeholderString: /SFO/g,},
              },
              {
                day: {replacementFiller: `'+slices[1].day+'`,placeholderString: /19TH/g,},
                week: {replacementFiller: `'+slices[1].week+'`,placeholderString: /Thursday/g,},
                month: {replacementFiller: `'+slices[1].month+'`,placeholderString: /FEBRUARY/g,},
                originAirport: {replacementFiller: `'+slices[1].originAirport+'`,placeholderString: /EWR/g,},
                departingAirport: {replacementFiller: `'+slices[1].departingAirport+'`,placeholderString: /LAX/g,},
              },
            ]
          },
          {tripNumber: {
            replacementFiller: "'+tripNumber+'",
            placeholderString: /XXX-XXX-XXX-XX/g,
          }},
        ];
        params.forEach((param, index) => {
          console.log('param');
          console.log(param);
          if (index === 0 && param.slices) {
            param.slices.forEach((slice, index) => {
              const {
                day,
                month,
                week,
                departingAirport,
                originAirport,
              } = slice;
              console.log('- - - - - - - - - - - - - - -');
              console.log(day.placeholderString);
              newInstruction = newInstruction.replace(day.placeholderString, day.replacementFiller)
              newInstruction = newInstruction.replace(month.placeholderString, month.replacementFiller)
              newInstruction = newInstruction.replace(week.placeholderString, week.replacementFiller)
              newInstruction = newInstruction.replace(departingAirport.placeholderString, departingAirport.replacementFiller)
              newInstruction = newInstruction.replace(originAirport.placeholderString, originAirport.replacementFiller);
            });
          } else if (index === 1 && param.tripNumber) {
            newInstruction = newInstruction.replace(param.tripNumber.placeholderString, param.tripNumber.replacementFiller)
          }
        });
        //SWITCHING TEXT TO VAR END
        content += newInstruction;
        fs.readFile(`${__dirname}/functionContent/foot.txt`, 'utf8', (err, foot) => {
          if (err) {
            return errorCallBack();
          }
          content += foot;
          fs.writeFile(`${__dirname}/animationFileCompiled/waiting-${new Date()}.js`, content, (err) => {
            if (err) {
              return errorCallBack();
            }
            return response.send(`
              <h1>completed</h1>
              <code>${content}</code>`);
            console.log('v v v v v v v v v v v v v v v v v v v v v v v vCOMPLETED!v v v v v v v v v v v v v v v v v v v v v v v v')
          });
        });
      });
    });*/

    //return response.send('<h1>failed</h1>');
  });

  api.get('/generate/ow', (request, response) => {
    const params = [
      {
        slices: [
          {
            day: {replacementFiller: `'+slices[0].day+'`,placeholderString: /15TH/g,},
            week: {replacementFiller: `'+slices[0].week+'`,placeholderString: /Saturday/g,},
            month: {replacementFiller: `'+slices[0].month+'`,placeholderString: /JANUARY/g,},
            originAirport: {replacementFiller: `'+slices[0].originAirport+'`,placeholderString: /JFK/g,},
            departingAirport: {replacementFiller: `'+slices[0].departingAirport+'`,placeholderString: /SFO/g,},
          },
        ]
      },
      {tripNumber: {
        replacementFiller: "'+tripNumber+'",
        placeholderString: /XXX-XXX-XXX-XX/g,
      }},
    ];
    const fileNameAdjustment = 'one-way';
    generateWaitAnimation(params, fileNameAdjustment, response);
  });
	return api;
}

function generateWaitAnimation(params, fileNameAdjustment, response) {
  const errorCallBack = function (error) {
    console.log(error);
  }
  let content = '';
  fs.readFile(`${__dirname}/functionContent/head.txt`, 'utf8', (err, head) => {
    if (err) {
      return errorCallBack();
    }

    content += head;

    fs.readFile(`${__dirname}/animationFileRaw/instruction/flight-loader-bodymovin-${fileNameAdjustment}.json`, 'utf8', (err, instruction) => {

      //SWITCHING TEXT TO VAR BEG
      console.log(instruction);
      let newInstruction=instruction;
      /*const params = [
        {
          slices: [
            {
              day: {replacementFiller: `'+slices[0].day+'`,placeholderString: /15TH/g,},
              week: {replacementFiller: `'+slices[0].week+'`,placeholderString: /Saturday/g,},
              month: {replacementFiller: `'+slices[0].month+'`,placeholderString: /JANUARY/g,},
              originAirport: {replacementFiller: `'+slices[0].originAirport+'`,placeholderString: /JFK/g,},
              departingAirport: {replacementFiller: `'+slices[0].departingAirport+'`,placeholderString: /SFO/g,},
            },
            {
              day: {replacementFiller: `'+slices[1].day+'`,placeholderString: /19TH/g,},
              week: {replacementFiller: `'+slices[1].week+'`,placeholderString: /Thursday/g,},
              month: {replacementFiller: `'+slices[1].month+'`,placeholderString: /FEBRUARY/g,},
              originAirport: {replacementFiller: `'+slices[1].originAirport+'`,placeholderString: /EWR/g,},
              departingAirport: {replacementFiller: `'+slices[1].departingAirport+'`,placeholderString: /LAX/g,},
            },
          ]
        },
        {tripNumber: {
          replacementFiller: "'+tripNumber+'",
          placeholderString: /XXX-XXX-XXX-XX/g,
        }},
      ];*/
      params.forEach((param, index) => {
        console.log('param');
        console.log(param);
        if (index === 0 && param.slices) {
          param.slices.forEach((slice) => {
            const {
              day,
              month,
              week,
              departingAirport,
              originAirport,
            } = slice;
            console.log('- - - - - - - - - - - - - - -');
            console.log(day.placeholderString);
            newInstruction = newInstruction.replace(day.placeholderString, day.replacementFiller)
            newInstruction = newInstruction.replace(month.placeholderString, month.replacementFiller)
            newInstruction = newInstruction.replace(week.placeholderString, week.replacementFiller)
            newInstruction = newInstruction.replace(departingAirport.placeholderString, departingAirport.replacementFiller)
            newInstruction = newInstruction.replace(originAirport.placeholderString, originAirport.replacementFiller);
          });
        } else if (index === 1 && param.tripNumber) {
          newInstruction = newInstruction.replace(param.tripNumber.placeholderString, param.tripNumber.replacementFiller)
        }
      });
      //SWITCHING TEXT TO VAR END
      content += newInstruction;
      fs.readFile(`${__dirname}/functionContent/foot.txt`, 'utf8', (err, foot) => {
        if (err) {
          return errorCallBack();
        }
        content += foot;
        fs.writeFile(`${__dirname}/animationFileCompiled/waiting-${fileNameAdjustment}-${new Date()}.js`, content, (err) => {
          if (err) {
            return errorCallBack();
          }
          return response.send(`
            <h1>completed</h1>
            <code>${content}</code>`);
          console.log(`v v v v v v v v v v v v v v v v v v v v v v v vbuilder ${version}COMPLETED!v v v v v v v v v v v v v v v v v v v v v v v v`);
        });
      });
    });
  });
}