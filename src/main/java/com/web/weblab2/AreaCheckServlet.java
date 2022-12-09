package com.web.weblab2;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.web.weblab2.businessLogic.CannotValidateException;
import com.web.weblab2.businessLogic.ParamsValidator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


/**
 * Осуществляет проверку попадания точки в область на координатной плоскости и формирует HTML-страницу с результатами
 * проверки. Должен обрабатывать все запросы, содержащие сведения о координатах точки и радиусе области.
 * */
@WebServlet(name = "areaCheckServlet", value = "/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {

    private final Gson gsonInterpreter = new GsonBuilder().setPrettyPrinting().create();

    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long start = System.nanoTime();
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        final String xCoordinate = request.getParameter("xCoordinate");
        final String yCoordinate = request.getParameter("yCoordinate");
        final String radius = request.getParameter("radius");

        try {
            ParamsValidator paramsValidator = new ParamsValidator(xCoordinate, yCoordinate, radius, start);
            out.println(gsonInterpreter.toJson(paramsValidator));
        } catch (CannotValidateException ex) {
            out.println(ex.getMessage());
        }


    }

    public void destroy() {
        super.destroy();
    }
}